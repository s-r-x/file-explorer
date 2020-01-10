export type SortBy = 'base' | 'size' | 'created' | 'modified';
export type SortType = 'asc' | 'desc';
export type Mode = 'icons' | 'list';

export type State = {
  sortBy: SortBy;
  sortType: SortType;
  mode: Mode;
  zoom: number;
  hidden: boolean;
}
