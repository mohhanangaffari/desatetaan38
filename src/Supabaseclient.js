import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://zdstjatdgjrwuenljutp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkc3RqYXRkZ2pyd3VlbmxqdXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODMzMzcsImV4cCI6MjA2OTU1OTMzN30.sAcflX0xZqNO4gtXDax7eWmI2OhyF5hTH6Uz3RQd_rg'

export const supabase = createClient(supabaseUrl,supabaseKey);