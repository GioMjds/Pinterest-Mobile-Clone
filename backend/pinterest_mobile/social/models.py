from django.db import models
from content.models import Pin, Board
import uuid

# Create your models here.
class UserFollow(models.Model):
    """User following relationship"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    follower = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='following',
        to_field='clerk_id'
    )
    following = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='followers',
        to_field='clerk_id'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_follows'
        unique_together = ('follower', 'following')
        indexes = [
            models.Index(fields=['follower']),
            models.Index(fields=['following']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"

class BoardFollow(models.Model):
    """Board following relationship"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='followed_boards',
        to_field='clerk_id'
    )
    board = models.ForeignKey(
        Board,
        on_delete=models.CASCADE,
        related_name='followers'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'board_follows'
        unique_together = ('user', 'board')
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['board']),
        ]
    
    def __str__(self):
        return f"{self.user.username} follows {self.board.title}"

class PinLike(models.Model):
    """Pin likes"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='liked_pins',
        to_field='clerk_id'
    )
    pin = models.ForeignKey(
        Pin,
        on_delete=models.CASCADE,
        related_name='likes'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'pin_likes'
        unique_together = ('user', 'pin')
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['pin']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} likes pin"

class Comment(models.Model):
    """Pin comments with threading support"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'user_management.User',
        on_delete=models.CASCADE,
        related_name='comments',
        to_field='clerk_id'
    )
    pin = models.ForeignKey(
        Pin,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )
    content = models.TextField(max_length=500)  # Limit for mobile
    
    # Mobile-specific fields
    is_edited = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'comments'
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['pin']),
            models.Index(fields=['parent']),
            models.Index(fields=['created_at']),
        ]
        ordering = ['created_at']
    
    def __str__(self):
        return f"Comment by {self.user.username}"