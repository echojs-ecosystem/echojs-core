import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const examplesNavSection = createDocNavSection('examples', 'Examples', [
  doc('examples/todo-app', 'Todo App'),
  doc('examples/dashboard', 'Dashboard'),
  doc('examples/admin-panel', 'Admin Panel'),
  doc('examples/e-commerce', 'E-commerce'),
])
