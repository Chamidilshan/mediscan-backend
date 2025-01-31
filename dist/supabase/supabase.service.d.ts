export declare class SupabaseService {
    private supabase;
    constructor();
    uploadFile(bucket: string, path: string, file: Buffer, contentType: string): Promise<{
        id: string;
        path: string;
        fullPath: string;
    }>;
    saveRecord(table: string, record: any): Promise<null>;
}
