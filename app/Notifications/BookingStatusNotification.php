<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingStatusNotification extends Notification
{
    use Queueable;

    public function __construct(private readonly Booking $booking, private readonly string $title, private readonly string $message, private readonly string $event)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'title' => $this->title,
            'message' => $this->message,
            'event' => $this->event,
            'url' => route('bookings.show', $this->booking),
        ];
    }
}
