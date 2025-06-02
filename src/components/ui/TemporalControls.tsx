
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  TrendingUp,
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemporalControlsProps {
  currentTime: number;
  onTimeChange: (time: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  crowdData: CrowdData;
}

interface CrowdData {
  currentCrowd: number;
  predictedCrowd: number;
  waitTime: number;
  busyAreas: string[];
}

const TemporalControls = ({ 
  currentTime, 
  onTimeChange, 
  isPlaying, 
  onPlayPause, 
  onReset,
  crowdData 
}: TemporalControlsProps) => {
  const formatTime = (hour: number) => {
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const getCrowdLevel = (level: number) => {
    if (level < 30) return { label: 'Faible', color: 'bg-green-500' };
    if (level < 70) return { label: 'Modéré', color: 'bg-yellow-500' };
    return { label: 'Élevé', color: 'bg-red-500' };
  };

  const currentCrowdLevel = getCrowdLevel(crowdData.currentCrowd);
  const predictedCrowdLevel = getCrowdLevel(crowdData.predictedCrowd);

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Contrôle temporel 4D
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPlayPause}
            className="flex items-center gap-1"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Heure actuelle</span>
          <Badge variant="outline">{formatTime(currentTime)}</Badge>
        </div>
        <Slider
          value={[currentTime]}
          onValueChange={(value) => onTimeChange(value[0])}
          max={22}
          min={8}
          step={0.25}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>8h00</span>
          <span>15h00</span>
          <span>22h00</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Affluence actuelle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", currentCrowdLevel.color)}></div>
            <span className="text-sm">{currentCrowdLevel.label}</span>
            <Badge variant="outline" className="text-xs">
              {crowdData.currentCrowd}%
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Prédiction +1h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", predictedCrowdLevel.color)}></div>
            <span className="text-sm">{predictedCrowdLevel.label}</span>
            <Badge variant="outline" className="text-xs">
              {crowdData.predictedCrowd}%
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Temps d'attente estimé</span>
        </div>
        <Badge variant={crowdData.waitTime > 10 ? "destructive" : "secondary"}>
          {crowdData.waitTime} minutes aux caisses
        </Badge>
      </div>

      {crowdData.busyAreas.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium">Zones très fréquentées</span>
          <div className="flex flex-wrap gap-1">
            {crowdData.busyAreas.map((area, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemporalControls;
