require 'sinatra'
require 'sinatra/json'
require 'pg'

# Database connection
def db_connection
  PG.connect(dbname: 'analytics_db', user: 'user', password: 'password')
end

# Routes
get '/api/analytics/tasks/completed' do
  conn = db_connection
  result = conn.exec('SELECT COUNT(*) FROM tasks WHERE status = $1', ['completed'])
  conn.close
  json count: result[0]['count']
end

get '/api/analytics/tasks/overdue' do
  conn = db_connection
  result = conn.exec('SELECT COUNT(*) FROM tasks WHERE deadline < NOW() AND status != $1', ['completed'])
  conn.close
  json count: result[0]['count']
end

get '/api/analytics/user_activity' do
  conn = db_connection
  result = conn.exec('SELECT user_id, COUNT(*) as activity_count FROM tasks GROUP BY user_id')
  conn.close
  json result.map { |row| { user_id: row['user_id'], activity_count: row['activity_count'] } }
end