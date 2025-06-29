interface BackupData {
  itinerary: any;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  budget: number;
  timestamp: string;
}

export class CloudBackupService {
  private readonly STORAGE_KEY = 'wanderwise_backups';
  private readonly MAX_BACKUPS = 10;

  async backup(data: BackupData): Promise<void> {
    try {
      // Simulate cloud backup with localStorage for demo
      // In production, this would use actual cloud storage APIs
      
      const backups = this.getExistingBackups();
      const newBackup = {
        id: this.generateBackupId(),
        ...data,
        size: this.calculateSize(data)
      };

      backups.unshift(newBackup);
      
      // Keep only the latest backups
      if (backups.length > this.MAX_BACKUPS) {
        backups.splice(this.MAX_BACKUPS);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(backups));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error('Backup failed:', error);
      throw new Error('Failed to backup itinerary to cloud');
    }
  }

  async restore(backupId: string): Promise<BackupData> {
    try {
      const backups = this.getExistingBackups();
      const backup = backups.find(b => b.id === backupId);
      
      if (!backup) {
        throw new Error('Backup not found');
      }
      
      return backup;
    } catch (error) {
      console.error('Restore failed:', error);
      throw new Error('Failed to restore itinerary from cloud');
    }
  }

  async listBackups(): Promise<Array<{ id: string; destination: string; timestamp: string; size: number }>> {
    try {
      const backups = this.getExistingBackups();
      return backups.map(backup => ({
        id: backup.id,
        destination: backup.destination,
        timestamp: backup.timestamp,
        size: backup.size
      }));
    } catch (error) {
      console.error('Failed to list backups:', error);
      return [];
    }
  }

  async deleteBackup(backupId: string): Promise<void> {
    try {
      const backups = this.getExistingBackups();
      const filteredBackups = backups.filter(b => b.id !== backupId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredBackups));
    } catch (error) {
      console.error('Failed to delete backup:', error);
      throw new Error('Failed to delete backup');
    }
  }

  async syncWithCloud(): Promise<void> {
    // Simulate cloud synchronization
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  getStorageUsage(): { used: number; total: number; percentage: number } {
    const backups = this.getExistingBackups();
    const used = backups.reduce((total, backup) => total + backup.size, 0);
    const total = 100 * 1024 * 1024; // 100 MB limit for demo
    
    return {
      used,
      total,
      percentage: (used / total) * 100
    };
  }

  private getExistingBackups(): any[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse existing backups:', error);
      return [];
    }
  }

  private generateBackupId(): string {
    return `backup_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private calculateSize(data: BackupData): number {
    // Estimate size in bytes
    const jsonString = JSON.stringify(data);
    return new Blob([jsonString]).size;
  }
}