import { getCategories } from '../_actions/get-categories'
import { CategoryItem } from './category-item'

export async function CategoryList() {
  const categories = await getCategories()

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
