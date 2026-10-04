Get-ChildItem -Path "app" -Recurse -Include "*.tsx","*.ts" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'vnhax\.com') {
        $newContent = $content -replace 'vnhax\.com', 'vnhax.net'
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Output "Fixed: $($_.Name)"
    }
}
