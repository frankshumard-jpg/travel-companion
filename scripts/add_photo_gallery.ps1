$pageCards = @{
    'london.html' = @('Big Ben / Parliament','Buckingham Palace','Changing of the Guard','Horse Guards Parade','Mayfair','WWII locations')
    'edinburgh.html' = @('Edinburgh Castle','Royal Mile','Edinburgh Tattoo','Dirleton Castle','Haliburton family heritage')
    'inverness.html' = @('Loch Ness','Urquhart Castle','Highlands','River Ness','Nessie lore')
    'portree.html' = @('Isle of Skye scenery','Portree harbour','Old Man of Storr','Quiraing','Skye coast')
    'belfast.html' = @('Titanic Quarter','Giant''s Causeway','City Hall','Peace Walls','Harbour views')
    'glasgow.html' = @('George Square','Glasgow Cathedral','Riverside Museum','Merchant City','Kelvingrove Park')
    'liverpool.html' = @('Royal Albert Dock','The Three Graces','Beatles landmarks','Liverpool Cathedral','Waterfront sunset')
    'dublin.html' = @('Guinness Experience','Trinity College','Temple Bar','River Liffey','St. Patrick''s Cathedral')
    'cork.html' = @('Waterford Crystal','Countryside','English Market','Blarney Castle','River Lee')
    'haugesund.html' = @('Haraldshaugen','Fjord waterfront','Åkrafjord','Local seafood','Town harbour')
    'nordfjordeid.html' = @('Fjord reflections','Viking Center','Waterfalls','Mountain views','Nordfjord port')
    'odda.html' = @('Fjord shore','Låtefossen','Mountain outlooks','Historic street','Water and glacier views')
    'rotterdam.html' = @('Port skyline','Euromast','Water taxis','Modern architecture','River cruise views')
    'amsterdam.html' = @('Canals','Dam Square','Jordaan','Museumplein','Bicycles')
    'alesund.html' = @('Art Nouveau','Harbour view','Mount Aksla','Fjordfront','Ålesund streets')
    'dover.html' = @('White Cliffs','Dover Castle','Port view','Embarkation','Coastal path')
    'faversham.html' = @('Historic market','Railway station','Medieval streets','Local shops','Riverfront')
    'rotterdam-disembarkation.html' = @('Port entry','Disembarkation','Euromast','Harbour skyline','City bridge')
}

$needle = '</section>`r`n      <section class="page-actions">'
foreach ($page in $pageCards.Keys) {
    if (-not (Test-Path $page)) {
        Write-Host "MISSING: $page"
        continue
    }
    $html = Get-Content $page -Raw
    if ($html -match "📸 Frank & Lynn's Photo Gallery") {
        Write-Host "SKIP existing gallery: $page"
        continue
    }

    $gallery = @'
      <section class="photo-gallery">
        <h3>📸 Frank & Lynn's Photo Gallery</h3>
        <div class="photo-gallery-grid">
'@
    foreach ($title in $pageCards[$page]) {
        $gallery += "          <article class=\"photo-card\">`r`n"
        $gallery += "            <h4>$title</h4>`r`n"
        $gallery += "            <div class=\"photo-placeholder\">Add photo here</div>`r`n"
        $gallery += "            <p class=\"photo-caption\">Caption: Add caption here</p>`r`n"
        $gallery += "            <p class=\"photo-note\"><strong>Frank & Lynn's Memory:</strong> Add our travel memory here</p>`r`n"
        $gallery += "          </article>`r`n"
    }
    $gallery += "        </div>`r`n      </section>`r`n"

    if ($html -notmatch [regex]::Escape($needle)) {
        Write-Host "NEEDLE not found in $page"
        continue
    }

    $html = $html -replace [regex]::Escape($needle), $gallery + $needle
    Set-Content -Path $page -Value $html -Encoding utf8
    Write-Host "UPDATED: $page"
}

$dirs = @('photos/london','photos/edinburgh','photos/inverness','photos/portree','photos/belfast','photos/glasgow','photos/liverpool','photos/dublin','photos/cork','photos/haugesund','photos/nordfjordeid','photos/odda','photos/rotterdam','photos/amsterdam','photos/alesund','photos/dover','photos/faversham','photos/rotterdam-disembarkation')
foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}
Write-Host 'done'