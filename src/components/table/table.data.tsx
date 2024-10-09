import { ColumnDef, SortingFn } from '@tanstack/react-table';

import { clx } from '@/utils/helper';

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
  'Carrot Cake',
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
  'Lemon Tart',
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
  'Pecan Pie',
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

function getRandomDessertName(usedNames: Set<string>): string {
  let name: string;
  do {
    name = dessertNames[Math.floor(Math.random() * dessertNames.length)];
  } while (usedNames.has(name));
  usedNames.add(name);
  return name;
}

export const tableData: Dessert[] = Array.from({ length: 100 }, () => {
  return {
    name: getRandomDessertName(usedNames),
    calories: Math.floor(Math.random() * 400) + 100,
    fat: parseFloat((Math.random() * 30).toFixed(1)),
    carbs: Math.floor(Math.random() * 100),
    protein: parseFloat((Math.random() * 50).toFixed(1)),
    isGlutenFree: Math.random() < 0.5,
  };
});

const sortStatusFn: SortingFn<Dessert> = (rowA, rowB) => {
  const statusA = rowA.original.name.toString();
  const statusB = rowB.original.name.toString();
  const statusOrder = ['single', 'complicated', 'relationship'];
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export const tableColumns: ColumnDef<Dessert>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="relative">
        <input
          id="select-all"
          className={clx(
            'appearance-none size-4 rounded bg-white cursor-pointer',
            table.getIsAllRowsSelected() && 'bg-primary-500',
          )}
          type="checkbox"
          {...{
            checked: table.getIsAllRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
        <label
          htmlFor="select-all"
          className="absolute cursor-pointer inset-0 size-4 flex items-center justify-center">
          <span className="hidden">checkbox label</span>
          <svg
            aria-hidden="true"
            role="presentation"
            viewBox="0 0 17 18"
            className={clx(
              'h-3 w-4 transition-opacity motion-reduce:transition-none',
              table.getIsAllRowsSelected() ? 'opacity-100' : 'opacity-0',
            )}>
            <polyline
              fill="none"
              points="1 9 7 14 15 4"
              stroke="currentColor"
              strokeDasharray="22"
              strokeDashoffset={table.getIsAllRowsSelected() ? '44' : '66'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="transition-[stroke-dashoffset] delay-100 duration-200 ease-linear"></polyline>
          </svg>
        </label>
      </div>
    ),
    cell: ({ row }) => (
      <div className="relative">
        <input
          id={row.id}
          className={clx(
            'appearance-none size-4 rounded bg-white cursor-pointer',
            row.getIsSelected() && 'bg-primary-500',
          )}
          type="checkbox"
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
        <label
          htmlFor={row.id}
          className="absolute cursor-pointer inset-0 size-4 flex items-center justify-center">
          <span className="hidden">checkbox label</span>
          <svg
            aria-hidden="true"
            role="presentation"
            viewBox="0 0 17 18"
            className={clx(
              'h-3 w-4 transition-opacity motion-reduce:transition-none',
              row.getIsSelected() ? 'opacity-100' : 'opacity-0',
            )}>
            <polyline
              fill="none"
              points="1 9 7 14 15 4"
              stroke="currentColor"
              strokeDasharray="22"
              strokeDashoffset={row.getIsSelected() ? '44' : '66'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="transition-[stroke-dashoffset] delay-100 duration-200 ease-linear"></polyline>
          </svg>
        </label>
      </div>
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
          className="size-6 stroke-green-600"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          // stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      ),
  },
];
