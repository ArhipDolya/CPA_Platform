from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser
from django.core.validators import RegexValidator
from django.db import models


class CustomUserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(null=True, max_length=15, validators=[
        RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number  must be entered in the format: '+999999999'. Up to 15 digits allowed."
        )
    ])
    balance = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USER_TYPE_CHOICES = (
        ('brand', 'Brand'),
        ('influencer', 'Influencer'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    telegram_username = models.CharField(max_length=55, null=True)
    brand_name = models.CharField(max_length=255, null=True)
    offers = models.ManyToManyField("offer.Offer", related_name="users")
    minimal_withdraw = models.DecimalField(max_digits=7, decimal_places=2, default=1000)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, app_label):
        return True


    def __str__(self):
        return f"{self.email}"

    objects = CustomUserManager()


class CustomUserOffer(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    offer = models.ForeignKey("offer.Offer", on_delete=models.CASCADE)
    generated_link = models.URLField()
    taken_date = models.DateTimeField(auto_now_add=True)
