#!/bin/bash

SA_PASSWORD="yourStrong(!)Password"
DB_HOST="sqlserver"

echo "Esperando a que SQL Server arranque..."

# Intentar con mssql-tools18 primero, si no con mssql-tools
SQLCMD=""
if [ -f /opt/mssql-tools18/bin/sqlcmd ]; then
  SQLCMD="/opt/mssql-tools18/bin/sqlcmd -No"
elif [ -f /opt/mssql-tools/bin/sqlcmd ]; then
  SQLCMD="/opt/mssql-tools/bin/sqlcmd"
else
  echo "ERROR: sqlcmd no encontrado"
  exit 1
fi

until $SQLCMD -S "$DB_HOST" -U sa -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null; do
  echo "SQL Server no está listo, esperando 5 segundos..."
  sleep 5
done

echo "SQL Server listo. Creando base de datos si no existe..."

$SQLCMD -S "$DB_HOST" -U sa -P "$SA_PASSWORD" \
  -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TimelapseDB') CREATE DATABASE TimelapseDB"

echo "Ejecutando script de tablas..."

$SQLCMD -S "$DB_HOST" -U sa -P "$SA_PASSWORD" -i /init/createDb.sql

echo "¡Base de datos inicializada correctamente!"