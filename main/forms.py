from django import forms
from .models import Course

class CourseUploadForm(forms.ModelForm):
    requirements = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'placeholder': 'أدخل المتطلبات، مفصولة بفاصلة'}),
        help_text='أدخل المتطلبات للدورة، مفصولة بفاصلة.',
        required=False
    )
    content = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'placeholder': 'أدخل محتوى الدورة، مفصول بفاصلة'}),
        help_text='أدخل محتوى الدورة، مفصول بفاصلة.',
        required=False
    )

    class Meta:
        model = Course
        fields = ('title', 'description', 'thumbnail', 'featured_video', 'level', 'duration', 'category', 'price', 'discount', 'requirements', 'content', 'lesson_title', 'lesson_video')
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'عنوان الدورة'}),
            'description': forms.Textarea(attrs={'rows': 4, 'placeholder': 'وصف الدورة'}),
            'duration': forms.TextInput(attrs={'placeholder': 'المدة الزمنية'}),
            'category': forms.TextInput(attrs={'placeholder': 'التصنيف'}),
            'price': forms.NumberInput(attrs={'placeholder': 'السعر الأصلي'}),
            'discount': forms.NumberInput(attrs={'placeholder': 'نسبة الخصم (%)'}),
            'lesson_title': forms.TextInput(attrs={'placeholder': 'عنوان الدرس'}),
        }

class CourseEditForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ('title', 'description', 'thumbnail', 'featured_video', 'level', 'duration', 'category', 'requirements', 'content', 'lesson_title', 'lesson_video')
