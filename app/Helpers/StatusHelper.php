<?php

namespace App\Helpers;

class StatusHelper
{
    /**
     * Get status label
     */
    public static function getLabel(string $type, string $status): string
    {
        return config("statuses.{$type}.{$status}.label", $status);
    }

    /**
     * Get status color
     */
    public static function getColor(string $type, string $status): string
    {
        return config("statuses.{$type}.{$status}.color", 'gray');
    }

    /**
     * Get all statuses of a type
     */
    public static function getAll(string $type): array
    {
        return config("statuses.{$type}", []);
    }

    /**
     * Get status options for select dropdown
     */
    public static function getOptions(string $type): array
    {
        $statuses = config("statuses.{$type}", []);
        $options = [];

        foreach ($statuses as $key => $value) {
            $options[] = [
                'value' => $key,
                'label' => $value['label'] ?? $key,
            ];
        }

        return $options;
    }

    /**
     * Get next possible statuses
     */
    public static function getNextStatuses(string $type, string $currentStatus): array
    {
        return config("statuses.{$type}.{$currentStatus}.next_status", []);
    }

    /**
     * Check if status transition is valid
     */
    public static function canTransitionTo(string $type, string $from, string $to): bool
    {
        $nextStatuses = self::getNextStatuses($type, $from);
        return in_array($to, $nextStatuses);
    }

    /**
     * Get Tailwind CSS classes for badge
     */
    public static function getBadgeClass(string $type, string $status): string
    {
        $color = self::getColor($type, $status);

        $colorMap = [
            'yellow' => 'bg-yellow-100 text-yellow-800',
            'blue' => 'bg-blue-100 text-blue-800',
            'green' => 'bg-green-100 text-green-800',
            'red' => 'bg-red-100 text-red-800',
            'purple' => 'bg-purple-100 text-purple-800',
            'gray' => 'bg-gray-100 text-gray-800',
        ];

        return $colorMap[$color] ?? $colorMap['gray'];
    }
}
