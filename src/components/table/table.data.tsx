import { ColumnDef, SortingFn } from '@tanstack/react-table';

import { TableCheckbox } from './components/TableCheckbox';
import { Dessert } from './table.types';

const dessertNames: string[] = [
  'Apple Pie',
  'Brownie',
  'Cheesecake',
  'Chocolate Cake',
  'Cupcake',
  'Doughnut',
  'Eclair',
  'Fruit Tart',
  'Gelato',
  'Ice Cream',
  'Jelly',
  'Macaron',
  'Muffin',
  'Pavlova',
  'Pecan Pie',
  'Pudding',
  'Red Velvet Cake',
  'Tiramisu',
  'Truffle',
  'Waffle',
  'Banana Split',
  'Baklava',
  'Churros',
  'Croissant',
  'Lemon Tart',
  'Meringue',
  'Panettone',
  'Profiterole',
  'Scone',
  'Sorbet',
  'Strawberry Shortcake',
  'Cannoli',
  'Carrot Cake',
  'Panna Cotta',
  'Crème Brûlée',
  'Rice Pudding',
  'Chocolate Chip Cookies',
  'Sugar Cookies',
  'Blondie',
  'Bread Pudding',
  'Key Lime Pie',
  'Fruit Salad',
  'Opera Cake',
  'Gingerbread',
  'Fudge',
  'Milkshake',
  'Frozen Yogurt',
  'Tart Tatin',
  'Beignets',
  'Mocha Cake',
  'Lava Cake',
  'Macaroons',
  'Peach Cobbler',
  'Peaches and Cream',
  'Peanut Butter Cookies',
  'Pecan Tart',
  'Pineapple Upside Down Cake',
  'Pistachio Cake',
  'Pound Cake',
  'Pumpkin Pie',
  'Rock Candy',
  'Rum Cake',
  'Salted Caramel Tart',
  'Sangria Cake',
  'Scones',
  'Spice Cake',
  'Strawberry Cheesecake',
  'Tapioca Pudding',
  'Tiramisu',
  'Vanilla Bean Ice Cream',
  'Walnut Cake',
  'White Chocolate Macadamia Nut Cookie',
  'Zucchini Bread',
  'Almond Tart',
  'Apricot Tart',
  'Avocado Mousse',
  'Banana Bread',
  'Black Forest Cake',
  'Blueberry Tart',
  'Butter Cookie',
  'Buttermilk Pie',
  'Caramel Custard',
  'Cherry Pie',
  'Chocolate Brownie',
  'Chocolate Chip Cookie',
  'Chocolate Mousse',
  'Coconut Cream Pie',
  'Coconut Macaroons',
  'Coffee Cake',
  'Cranberry Pie',
  'Creme Brulee',
  'Creme Fraiche Tart',
  'Date Nut Bread',
  'Devil’s Food Cake',
  'Double Chocolate Cake',
  'Durian Mousse',
  'Egg Nog',
  'Ferrero Rocher Tart',
  'Fig Tart',
  'Flan',
  'Fruitcake',
  'Ganache Tart',
  'Gingerbread Cookie',
  'Graham Cracker Pie',
  'Green Tea Cake',
  'Honey Cake',
  'Hot Chocolate Fudge',
  'Lime Tart',
  'Lobster Bisque',
  'Macaroon',
  'Mango Tart',
  'Marzipan Tart',
  'Molten Chocolate Cake',
  'Mud Cake',
  'New York Cheesecake',
  'Oreo Cookie Dough Ice Cream',
  'Peach Cobbler',
  'Peanut Butter Pie',
  'Pistachio Tart',
  'Pineapple Upside Down Cake',
  'Pistachio Cake',
  'Pound Cake',
  'Pumpkin Pie',
  'Rock Candy',
  'Rum Cake',
  'Salted Caramel Tart',
  'Sangria Cake',
  'Scones',
  'Spice Cake',
  'Strawberry Cheesecake',
  'Tapioca Pudding',
  'Tiramisu',
  'Vanilla Bean Ice Cream',
  'Walnut Cake',
  'White Chocolate Macadamia Nut Cookie',
  'Zucchini Bread',
];

const usedNames = new Set<string>();

const getRandomDessertName = (usedNames: Set<string>): string => {
  let name: string;
  do {
    name = dessertNames[Math.floor(Math.random() * dessertNames.length)];
  } while (usedNames.has(name));
  usedNames.add(name);
  return name;
};

const getRandomNumber = (
  min: number,
  max: number,
  precision: number,
): number => {
  const randomValue = Math.random() * (max - min) + min;
  return parseFloat(randomValue.toFixed(precision));
};

export const tableData: Dessert[] = Array.from({ length: 100 }, () => {
  return {
    name: getRandomDessertName(usedNames),
    calories: getRandomNumber(100, 400, 0),
    fat: getRandomNumber(0, 30, 1),
    carbs: getRandomNumber(0, 100, 0),
    protein: getRandomNumber(0, 50, 1),
    isGlutenFree: Math.random() < 0.5,
  };
});

const sortStatusFn: SortingFn<Dessert> = (rowA, rowB) => {
  const statusA = rowA.original.name.toString();
  const statusB = rowB.original.name.toString();
  return statusA.localeCompare(statusB);
};

export const tableColumns: ColumnDef<Dessert>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <TableCheckbox
        id="select-all"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <TableCheckbox
        id={row.id}
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    header: 'Dessert (100g serving)',
    accessorKey: 'name',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    header: 'Calories',
    accessorKey: 'calories',
  },
  {
    header: 'Fat (g)',
    accessorKey: 'fat',
  },
  {
    header: 'Carbs (g)',
    accessorKey: 'carbs',
    sortingFn: sortStatusFn,
  },
  {
    header: 'Protein (g)',
    accessorKey: 'protein',
  },
  {
    header: 'Gluten Free',
    accessorKey: 'isGlutenFree',
    cell: (info) =>
      info.getValue() && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6 stroke-green-600 mx-auto"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      ),
  },
];
