FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["TimelapseAPI.csproj", "./"]

RUN dotnet restore "TimelapseAPI.csproj"

COPY . .

RUN dotnet publish "TimelapseAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000/

ENTRYPOINT ["dotnet", "TimelapseAPI.dll"]