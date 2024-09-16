export function generateColor(withHash : boolean = false): string {
    const colors = [
        "FF5733", // Vibrant Orange
        "33FF57", // Bright Green
        "5733FF", // Bold Blue
        "FF33A6", // Vivid Pink
        "33FFF1", // Aqua Blue
        "FFBD33", // Bright Yellow-Orange
        "FF3380", // Hot Pink
        "33FF88", // Neon Green
        "FF8633", // Fiery Orange
        "FF3333", // Bright Red
        "DC3545"  // Bootstrap Red (added)
    ];
    const color = Math.floor(Math.random() * colors.length);
    return withHash ? `#${colors[color]}` : colors[color];
}