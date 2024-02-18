ENV_FILE="../../server/.env"

if [ -f "$ENV_FILE" ]; then
    DATABASE=$(grep -E '^\s*DATABASE\s*=' "$ENV_FILE" | cut -d '=' -f2 | tr -d '[:space:]')
    
    echo "Database specified in .env file: $DATABASE"

    export DATABASE

    if [ "$DATABASE" == "mongoDB" ]; then
        echo "Running docker-compose-prod for MongoDB"
        docker-compose -f ../docker-compose-prod.yml up --build -d client server mongo
    elif [ "$DATABASE" == "postgreSQL" ]; then
        echo "Running docker-compose-prod for PostgreSQL"
        docker-compose -f ../docker-compose-prod.yml up --build -d client server postgres
    else
        echo "Invalid DATABASE specified in .env file"
        exit 1
    fi
else
    echo ".env file not found in the server directory"
    exit 1
fi
