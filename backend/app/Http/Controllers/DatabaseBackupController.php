<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DatabaseBackupController extends Controller
{
    const BACKUP_DIR = 'database-backups';
    /**
     * Get the list of the taken backups
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = [];

        $files = Storage::files(self::BACKUP_DIR);
        foreach($files as $fpath) {
            $fileInfo = [];

            $size = Storage::size($fpath) / 1024;
            if ($size > 1024) {
                $size /= 1024;
                $fileInfo['size_in'] = 'MB';
            } else {
                $fileInfo['size_in'] = 'KB';
            }

            $fileInfo['size'] = round($size, 2);
            $fileInfo['name'] = basename($fpath);
            $fileInfo['created_at'] = date('Y-m-d H:i:s', Storage::lastModified($fpath));

            $result[] = $fileInfo;
        }

        $result = array_reverse($result);

        return response()->json($result);
    }

    /**
     * Take backup of database
     *
     * @return \Illuminate\Http\Response
     */
    public function backup()
    {
        $host = env('DB_HOST');
        $port = env('DB_PORT');
        $database = env('DB_DATABASE');
        $username = env('DB_USERNAME');
        $password = env('DB_PASSWORD');

        $filePath = Storage::path(sprintf('%s/%s.sql', self::BACKUP_DIR, date('Y-m-d_H-i-s')));
        Storage::makeDirectory(self::BACKUP_DIR);

        exec("mysqldump --no-tablespaces --user={$username} --password={$password} --host={$host} --port={$port} {$database} --result-file={$filePath} 2>&1", $result);

        return $this->messageResponse('Backup taken', 200);
    }

    /**
     * Download the backup file
     *
     * @param string $filename
     * @return Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function download($filename)
    {
        $filePath = sprintf('%s/%s', self::BACKUP_DIR, $filename);
        if(!Storage::exists($filePath)) {
            return $this->messageResponse('File not found!', 404);
        }

        return Storage::download($filePath, $filename);
    }

    /**
     * Delete the backup file
     *
     * @param string $filename
     * @return \Illuminate\Http\Response
     */
    public function delete($filename)
    {
        $filePath = sprintf('%s/%s', self::BACKUP_DIR, $filename);
        if(!Storage::exists($filePath)) {
            return $this->messageResponse('File not found!', 404);
        }
        Storage::delete($filePath);
        return $this->messageResponse('Backup File deleted!', 200);
    }
}
