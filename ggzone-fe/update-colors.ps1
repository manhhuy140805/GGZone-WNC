# Script to update admin colors from cyan to orange theme
$cssFile = "src/admin/AdminStyles.css"
$content = Get-Content $cssFile -Raw

# Replace color values
$content = $content -replace '0, 240, 255', '255, 107, 53'  # cyan RGB to orange RGB
$content = $content -replace '181, 55, 242', '168, 85, 247'  # purple RGB
$content = $content -replace '255, 0, 110', '234, 88, 12'  # pink RGB to dark orange
$content = $content -replace '0, 255, 136', '16, 185, 129'  # green RGB

# Replace CSS variables
$content = $content -replace 'var\(--neon-cyan\)', 'var(--primary-orange)'
$content = $content -replace 'var\(--neon-purple\)', 'var(--accent-purple)'
$content = $content -replace 'var\(--neon-pink\)', 'var(--dark-orange)'
$content = $content -replace 'var\(--neon-green\)', 'var(--success-green)'

# Save updated content
$content | Set-Content $cssFile -NoNewline

Write-Host "Colors updated successfully!" -ForegroundColor Green
