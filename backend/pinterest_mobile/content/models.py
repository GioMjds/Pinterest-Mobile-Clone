from django.db import models
import uuid

# Create your models here.
class Category(models.Model):
    """Pin categories"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Board(models.Model):
    """User boards/collections"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='boards',
        to_field='user_id'
    )
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    cover_image = models.URLField(max_length=500, blank=True)
    is_private = models.BooleanField(default=False)

    color_theme = models.CharField(max_length=7, default='#000000')
    pin_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'boards'
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['created_at']),
            models.Index(fields=['is_private']),
        ]
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"

class Pin(models.Model):
    """Main pin model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='pins',
        to_field='user_id'
    )
    board = models.ForeignKey(
        Board,
        on_delete=models.CASCADE,
        related_name='pins'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='pins'
    )
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(max_length=500)
    original_url = models.URLField(max_length=500, blank=True)
    
    # Image dimensions for mobile layout
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    
    # Mobile-specific fields
    dominant_color = models.CharField(max_length=7, blank=True)  # For blur/loading effects
    is_video = models.BooleanField(default=False)
    
    # Engagement counts (denormalized for performance)
    like_count = models.PositiveIntegerField(default=0)
    save_count = models.PositiveIntegerField(default=0)
    comment_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'pins'
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['board']),
            models.Index(fields=['category']),
            models.Index(fields=['created_at']),
            models.Index(fields=['-like_count']),  # For trending
        ]
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title or f"Pin by {self.user.username}"

class PinSave(models.Model):
    """When users save pins to their boards"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='saved_pins',
        to_field='user_id'
    )
    pin = models.ForeignKey(
        Pin,
        on_delete=models.CASCADE,
        related_name='saves'
    )
    board = models.ForeignKey(
        Board,
        on_delete=models.CASCADE,
        related_name='saved_pins'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'pin_saves'
        unique_together = ('user', 'pin', 'board')
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['pin']),
            models.Index(fields=['board']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} saved pin to {self.board.title}"