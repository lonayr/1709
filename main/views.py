import cloudinary
import cloudinary.uploader
import cloudinary.api

from django.shortcuts import render, redirect

from django.utils.text import slugify
from .models import Course, Enrollment
from django.db import models

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from django.contrib.auth.decorators import login_required

from .forms import CourseEditForm, CourseUploadForm

from django.contrib import messages

import pytz

# Create your views here.


def index(request):
    courses = Course.objects.all()[:6]
    return render(request, 'index.html', {'courses': courses})


def about(request):
    return render(request, 'about.html')


def contact(request):
    if request.method == 'POST':
        firstname = request.POST.get('firstname')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')

        # Basic validation
        if not firstname or not email or not message:
            messages.error(request, 'يرجى ملء جميع الحقول المطلوبة.')
            return render(request, 'contact.html')

        # Send email
        try:
            from django.core.mail import send_mail
            subject = f'رسالة من {firstname}'
            body = f"""
            اسم المرسل: {firstname}
            البريد الإلكتروني: {email}
            رقم الهاتف: {phone or 'غير محدد'}

            الرسالة:
            {message}
            """
            send_mail(
                subject,
                body,
                email,  # From email
                ['dev.ash.py@gmail.com'],  # To email - replace with your email
                fail_silently=False,
            )
            messages.success(request, 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.')
        except Exception as e:
            messages.error(request, 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.')

    return render(request, 'contact.html')


def courses(request):
    query = request.GET.get('q', '')
    category_filter = request.GET.get('category', '')
    level_filter = request.GET.get('level', '')

    courses = Course.objects.all()

    # Apply search filter
    if query:
        courses = courses.filter(
            models.Q(title__icontains=query) |
            models.Q(description__icontains=query) |
            models.Q(instructor__username__icontains=query) |
            models.Q(category__icontains=query)
        )

    # Apply category filter
    if category_filter:
        courses = courses.filter(category__iexact=category_filter)

    # Apply level filter
    if level_filter:
        courses = courses.filter(level=level_filter)

    # Get unique categories and levels for filter options
    categories = Course.objects.values_list('category', flat=True).distinct()
    levels = Course.objects.values_list('level', flat=True).distinct()

    context = {
        'courses': courses,
        'query': query,
        'category_filter': category_filter,
        'level_filter': level_filter,
        'categories': categories,
        'levels': levels,
        'total_results': courses.count()
    }
    return render(request, 'courses.html', context)

# def profile(request):
#     user = request.user
#     if user.is_authenticated:
#         # get first and last name
#         first_name = user.first_name
#         last_name = user.last_name

#         # get username and email
#         username = user.username
#         email = user.email

#         # get profile picture
#         profile_picture = None
#         if hasattr(user, 'profile'):
#             profile_picture = user.profile.picture

#         return render(request, 'account/dashboard/profile.html', {'first_name': first_name, 'last_name': last_name, 'username': username, 'email': email, 'profile_picture': profile_picture})
#     else:
#         return redirect('account_login')


def dashboard_home(request):
    user = request.user
    courses_uploaded = Course.objects.filter(instructor=user)
    num_courses_uploaded = courses_uploaded.count()
    courses_enrolled = Course.objects.filter(students=user)
    num_courses_enrolled = courses_enrolled.count()
    num_students = Enrollment.objects.filter(course__in=courses_uploaded).values('student').distinct().count()
    
    instructor = request.user
    courses = Course.objects.filter(instructor=instructor)

    enrollments = []
    ist_tz = pytz.timezone('Asia/Kolkata')

    for course in courses:
        course_enrollments = Enrollment.objects.filter(course=course)
        for enrollment in course_enrollments:
            student = enrollment.student
            enrollment_date_ist = enrollment.enrolled_at.astimezone(ist_tz)
            enrollment_date = enrollment_date_ist.strftime('%d %B %Y %H:%M:%S')
            enrollments.append({'course_title': course.title, 'student_name': student.username, 'enrollment_date': enrollment_date})

    context = {
        'courses_uploaded': courses_uploaded,
        'num_courses_uploaded': num_courses_uploaded,
        'num_courses_enrolled': num_courses_enrolled,
        'num_students': num_students,
        'enrollments': enrollments,
    }
    return render(request, 'dashboard/home.html', context)


def profile(request):
    user = request.user
    email = user.email
    full_name = f"{user.first_name} {user.last_name}"
    username = user.username
    return render(request, 'dashboard/profile.html', {'email': email, 'full_name': full_name, 'username': username})


def courses_enrolled(request):
    user = request.user
    courses = Course.objects.filter(students=user)
    context = {
        'courses': courses
    }
    return render(request, 'dashboard/courses-enrolled.html', context)


def courses_uploaded(request):
    courses = Course.objects.filter(instructor=request.user)
    return render(request, 'dashboard/courses-uploaded.html', {'courses': courses})

@login_required
def upload(request):
    if request.method == 'POST':
        form = CourseUploadForm(request.POST, request.FILES)
        if form.is_valid():
            course = form.save(commit=False)
            course.instructor = request.user

            # Calculate discounted price
            if course.discount > 0:
                discounted_price = (course.discount / 100) * course.price
                course.price = course.price - discounted_price

            # Upload files to Cloudinary
            if 'thumbnail' in request.FILES:
                thumbnail_upload = cloudinary.uploader.upload(request.FILES['thumbnail'])
                course.thumbnail = thumbnail_upload['secure_url']

            if 'featured_video' in request.FILES:
                featured_video_upload = cloudinary.uploader.upload(
                    request.FILES['featured_video'], resource_type="video")
                course.featured_video = featured_video_upload['secure_url']

            if 'lesson_video' in request.FILES:
                lesson_video_upload = cloudinary.uploader.upload(
                    request.FILES['lesson_video'], resource_type="video")
                course.lesson_video = lesson_video_upload['secure_url']



            course.save()
            messages.success(request, 'تم رفع الدورة بنجاح!')
            return redirect('courses-uploaded')
        else:
            messages.error(request, 'حدث خطأ في رفع الدورة. يرجى التحقق من البيانات المدخلة.')
    else:
        form = CourseUploadForm()

    return render(request, 'dashboard/upload.html', {'form': form})


# def course_details(request, instructor, slug):
#     instructor_obj = get_object_or_404(User, username=instructor)
#     course = get_object_or_404(Course, slug=slug, instructor=instructor_obj)
#     context = {
#         'course': course
#     }
#     return render(request, 'course.html', context)

def course_details(request, instructor, slug):
    instructor_obj = get_object_or_404(User, username=instructor)
    course = get_object_or_404(Course, slug=slug, instructor=instructor_obj)
    category_courses = Course.objects.filter(category__iexact=course.category).exclude(id=course.id)[:3]

    enrolled = False
    
    if request.user.is_authenticated:
        enrolled = course.students.filter(id=request.user.id).exists()

    if request.method == 'POST' and not enrolled:
        user = request.user
        course.students.add(user)
        enrollment = Enrollment(student=user, course=course)
        enrollment.save()
        messages.success(request, 'You have enrolled in this course!')
        return redirect('course_details', instructor=instructor, slug=slug)

    context = {
        'course': course,
        'enrolled': enrolled,
        'category_courses': category_courses
    }
    return render(request, 'course.html', context)

@login_required
def course_edit(request, slug):
    course = get_object_or_404(Course, slug=slug, instructor=request.user)
    if request.method == 'POST':
        form = CourseEditForm(request.POST, request.FILES, instance=course)
        if form.is_valid():
            form.save()
    else:
        form = CourseEditForm(instance=course)
    return render(request, 'dashboard/course-edit.html', {'form': form, 'course': course})

@login_required
def delete_course(request, slug):
    course = get_object_or_404(Course, slug=slug, instructor=request.user)
    if request.method == 'POST':
        course.delete()
        return redirect('/dashboard/courses-uploaded')
    context = {
        'course': course,
    }
    return render(request, 'dashboard/course-edit.html', context)

def category(request, category):
    courses = Course.objects.filter(category__iexact=category)
    context = {
        'category': category,
        'courses': courses
    }
    return render(request, 'category.html', context)