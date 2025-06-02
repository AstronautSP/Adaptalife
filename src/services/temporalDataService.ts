
export interface CrowdData {
  currentCrowd: number;
  predictedCrowd: number;
  waitTime: number;
  busyAreas: string[];
}

export interface TemporalStoreData {
  time: number;
  crowdData: CrowdData;
  sectionCrowds: Record<string, number>;
  restockSchedule: Array<{
    section: string;
    time: number;
    item: string;
  }>;
}

export class TemporalDataService {
  private static generateCrowdPattern(hour: number): number {
    // Modèle d'affluence basé sur des heures réelles de supermarché
    if (hour < 8 || hour > 22) return 0;
    if (hour >= 8 && hour < 10) return 20 + (hour - 8) * 15; // Montée matinale
    if (hour >= 10 && hour < 12) return 50 + Math.sin((hour - 10) * Math.PI) * 10;
    if (hour >= 12 && hour < 14) return 80 + Math.sin((hour - 12) * Math.PI) * 15; // Pic déjeuner
    if (hour >= 14 && hour < 17) return 45 + Math.sin((hour - 14) * Math.PI / 3) * 10;
    if (hour >= 17 && hour < 19) return 75 + Math.sin((hour - 17) * Math.PI) * 20; // Pic soirée
    if (hour >= 19 && hour < 22) return 55 - (hour - 19) * 15; // Descente
    return 10;
  }

  private static getSectionCrowdMultiplier(sectionId: string, hour: number): number {
    const multipliers: Record<string, (hour: number) => number> = {
      'produce': (h) => h >= 8 && h <= 10 ? 1.3 : 1.0, // Plus fréquenté le matin
      'bakery': (h) => h >= 7 && h <= 9 ? 1.5 : h >= 17 && h <= 19 ? 1.2 : 1.0,
      'meat': (h) => h >= 17 && h <= 19 ? 1.4 : 1.0, // Pic en soirée
      'dairy': (h) => 1.0, // Stable
      'frozen': (h) => h >= 18 && h <= 20 ? 1.2 : 1.0,
      'beverages': (h) => h >= 16 && h <= 18 ? 1.3 : 1.0, // Apéro time
      'health': (h) => h >= 10 && h <= 12 ? 1.2 : 1.0,
      'household': (h) => h >= 14 && h <= 16 ? 1.1 : 1.0,
    };

    return multipliers[sectionId]?.(hour) || 1.0;
  }

  private static getBusyAreas(sectionCrowds: Record<string, number>): string[] {
    const sectionNames: Record<string, string> = {
      'produce': 'Fruits & Légumes',
      'bakery': 'Boulangerie',
      'meat': 'Boucherie',
      'dairy': 'Produits Laitiers',
      'frozen': 'Surgelés',
      'beverages': 'Boissons',
      'health': 'Santé & Beauté',
      'household': 'Maison',
    };

    return Object.entries(sectionCrowds)
      .filter(([_, crowd]) => crowd > 70)
      .map(([sectionId, _]) => sectionNames[sectionId])
      .filter(Boolean);
  }

  static generateTemporalData(time: number): TemporalStoreData {
    const baseCrowd = this.generateCrowdPattern(time);
    const predictedCrowd = this.generateCrowdPattern(time + 1);
    
    // Générer les données d'affluence par section
    const sectionIds = ['produce', 'bakery', 'meat', 'dairy', 'frozen', 'beverages', 'health', 'household'];
    const sectionCrowds: Record<string, number> = {};
    
    sectionIds.forEach(sectionId => {
      const multiplier = this.getSectionCrowdMultiplier(sectionId, time);
      sectionCrowds[sectionId] = Math.min(100, Math.max(0, baseCrowd * multiplier + (Math.random() - 0.5) * 20));
    });

    // Calculer le temps d'attente basé sur l'affluence
    const waitTime = Math.round(baseCrowd * 0.15 + Math.random() * 5);
    
    // Obtenir les zones très fréquentées
    const busyAreas = this.getBusyAreas(sectionCrowds);

    // Programme de réapprovisionnement (simulé)
    const restockSchedule = [
      { section: 'Boulangerie', time: 14, item: 'Pain frais' },
      { section: 'Fruits & Légumes', time: 16, item: 'Produits frais' },
      { section: 'Surgelés', time: 6, item: 'Réapprovisionnement' },
      { section: 'Produits Laitiers', time: 8, item: 'Produits frais' },
    ];

    return {
      time,
      crowdData: {
        currentCrowd: Math.round(baseCrowd),
        predictedCrowd: Math.round(predictedCrowd),
        waitTime,
        busyAreas,
      },
      sectionCrowds,
      restockSchedule,
    };
  }

  static getOptimalVisitTime(targetSections: string[]): { time: number; reason: string } {
    const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8h à 22h
    let bestTime = 10;
    let minCrowd = Infinity;

    for (const hour of hours) {
      const data = this.generateTemporalData(hour);
      const avgCrowd = targetSections.reduce((sum, section) => 
        sum + (data.sectionCrowds[section] || 0), 0) / targetSections.length;
      
      if (avgCrowd < minCrowd) {
        minCrowd = avgCrowd;
        bestTime = hour;
      }
    }

    return {
      time: bestTime,
      reason: `Affluence minimale (${Math.round(minCrowd)}%) dans vos rayons cibles`
    };
  }
}
