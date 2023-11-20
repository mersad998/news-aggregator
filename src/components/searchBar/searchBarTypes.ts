import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

export interface SearchBarControllerProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onResourceSelect: (selectedResources: string[]) => void;
}

export interface SearchBarViewProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onResourceSelect: (event: SelectChangeEvent<string[]>) => void;
  selectedResources: string[];
}
