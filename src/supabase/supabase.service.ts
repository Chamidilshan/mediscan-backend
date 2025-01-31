/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {

    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_KEY, 
        );
      } 
    

    async uploadFile(bucket: string, path: string, file: Buffer, contentType: string){
        const { data, error } = await this.supabase.storage.from(bucket).upload(path, file, { contentType });
        if(error){
            throw new Error(error.message);
        }
        return data; 
    }

    async saveRecord(table: string, record: any){
        const { data, error } = await this.supabase.from(table).insert(record);
        if(error){
            throw new Error(error.message);
        }
        return data;
    }
}
