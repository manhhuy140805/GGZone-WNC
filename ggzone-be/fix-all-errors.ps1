# PowerShell script to fix all property name mismatches in controllers

Write-Host "Starting to fix all controller errors..." -ForegroundColor Green

# Define replacements
$replacements = @(
    # Photo model fixes
    @{ File = "Controllers/PhotoController.cs"; Old = "p.Url"; New = "p.ImageUrl" }
    @{ File = "Controllers/PhotoController.cs"; Old = "p.UploadedAt"; New = "p.CreatedAt" }
    @{ File = "Controllers/PhotoController.cs"; Old = "photo.UploadedAt"; New = "photo.CreatedAt" }
    
    # UserBadge model fixes
    @{ File = "Controllers/BadgeController.cs"; Old = "b.EarnedAt"; New = "b.AwardedAt" }
    @{ File = "Controllers/BadgeController.cs"; Old = "b.BadgeDescription"; New = "b.BadgeType" }
    @{ File = "Controllers/BadgeController.cs"; Old = "b.BadgeIconUrl"; New = "b.IconUrl" }
    @{ File = "Controllers/BadgeController.cs"; Old = "badge.EarnedAt"; New = "badge.AwardedAt" }
    
    # UserActivityLog model fixes
    @{ File = "Controllers/ActivityController.cs"; Old = "a.Timestamp"; New = "a.CreatedAt" }
    @{ File = "Controllers/ActivityController.cs"; Old = "a.Description"; New = "a.RelatedType" }
    @{ File = "Controllers/ActivityController.cs"; Old = "a.IpAddress"; New = "" }
    @{ File = "Controllers/ActivityController.cs"; Old = "activity.Timestamp"; New = "activity.CreatedAt" }
    
    # TrendingItem model fixes
    @{ File = "Controllers/TrendingController.cs"; Old = ".OrderBy(t => t.Rank)"; New = ".OrderByDescending(t => t.EngagementScore)" }
    @{ File = "Controllers/TrendingController.cs"; Old = ".OrderBy(tp => tp.Rank)"; New = ".OrderByDescending(tp => tp.Score)" }
    @{ File = "Controllers/TrendingController.cs"; Old = "t.Rank,"; New = "" }
    @{ File = "Controllers/TrendingController.cs"; Old = "tp.Rank,"; New = "" }
    @{ File = "Controllers/TrendingController.cs"; Old = "Rank = t.Rank"; New = "" }
    @{ File = "Controllers/TrendingController.cs"; Old = "Rank = tp.Rank"; New = "" }
    
    # StoreOrder model fixes
    @{ File = "Controllers/OrderController.cs"; Old = "o.OrderDate"; New = "o.CreatedAt" }
    @{ File = "Controllers/OrderController.cs"; Old = "o.ShippingAddress,"; New = "" }
    @{ File = "Controllers/OrderController.cs"; Old = "o.PaymentMethod,"; New = "" }
    @{ File = "Controllers/OrderController.cs"; Old = "OrderDate ="; New = "CreatedAt =" }
    @{ File = "Controllers/OrderController.cs"; Old = "ShippingAddress ="; New = "//" }
    @{ File = "Controllers/OrderController.cs"; Old = "PaymentMethod ="; New = "//" }
    
    # OrderItem model fixes
    @{ File = "Controllers/OrderController.cs"; Old = "oi.Price"; New = "oi.UnitPrice" }
    @{ File = "Controllers/OrderController.cs"; Old = "Price = item.Price"; New = "UnitPrice = item.Price, TotalPrice = item.Price * item.Quantity" }
    
    # StoreProduct model fixes
    @{ File = "Controllers/StoreController.cs"; Old = "p.ImageUrl"; New = "p.CoverImageUrl" }
    @{ File = "Controllers/StoreController.cs"; Old = "p.Stock,"; New = "" }
    @{ File = "Controllers/StoreController.cs"; Old = "p.IsAvailable"; New = "p.Status" }
    @{ File = "Controllers/StoreController.cs"; Old = "product.ImageUrl"; New = "product.CoverImageUrl" }
    @{ File = "Controllers/StoreController.cs"; Old = "product.Stock"; New = "" }
    @{ File = "Controllers/StoreController.cs"; Old = "product.IsAvailable"; New = "product.Status" }
    
    # Group model fixes
    @{ File = "Controllers/SearchController.cs"; Old = "g.MemberCount"; New = "g.MembersCount" }
    
    # Video model fixes
    @{ File = "Controllers/SearchController.cs"; Old = "v.Views"; New = "v.ViewsCount" }
    
    # DailyStatistic model fixes
    @{ File = "Controllers/StatisticsController.cs"; Old = "ds.Date"; New = "ds.StatDate" }
    @{ File = "Controllers/StatisticsController.cs"; Old = "ds.NewPosts"; New = "ds.TotalPosts" }
    @{ File = "Controllers/StatisticsController.cs"; Old = "ds.NewVideos"; New = "ds.TotalVideos" }
    @{ File = "Controllers/StatisticsController.cs"; Old = "ds.TotalLogins"; New = "" }
    
    # AppDbContext fixes
    @{ File = "Controllers/StatisticsController.cs"; Old = "_context.UserGameLibrary"; New = "_context.UserGameLibraries" }
)

$fixedCount = 0

foreach ($replacement in $replacements) {
    $filePath = Join-Path $PSScriptRoot $replacement.File
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        if ($content -match [regex]::Escape($replacement.Old)) {
            if ($replacement.New -eq "") {
                # Remove the line containing the old text
                $lines = Get-Content $filePath
                $newLines = $lines | Where-Object { $_ -notmatch [regex]::Escape($replacement.Old) }
                $newLines | Set-Content $filePath
            } else {
                $content = $content -replace [regex]::Escape($replacement.Old), $replacement.New
                Set-Content $filePath $content -NoNewline
            }
            
            $fixedCount++
            Write-Host "Fixed: $($replacement.File) - $($replacement.Old) -> $($replacement.New)" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nTotal fixes applied: $fixedCount" -ForegroundColor Green
Write-Host "Done! Please rebuild the project." -ForegroundColor Green
