Set-Location ./src/SectionsEC.Web/SectionsECClientApp
npm install
Set-Location ../

# Start the .NET application using dotnet run
Start-Process -FilePath "cmd" -ArgumentList "/c", "dotnet run"

# Start the Angular application using ng serve
Start-Process -FilePath "cmd" -ArgumentList "/c", "cd ./SectionsECClientApp && ng serve"
