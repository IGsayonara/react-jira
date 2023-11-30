export interface ICard {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface IColumn {
  title: string;
  cards: ICard[];
}
