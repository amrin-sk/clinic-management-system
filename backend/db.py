import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="clinic_db",
        user="postgres",
        password="Fathima@5459",
        port="5432"
    )
    return conn
