/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const iotIcon = <svg className={iconClasses} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.52 6.43996C12.752 6.43996 12.08 6.96796 11.912 7.68796H10.736C10.544 6.34396 9.39195 5.28796 7.97595 5.28796C6.55995 5.28796 5.40795 6.31996 5.21595 7.68796H4.03995C3.84795 6.96796 3.19995 6.43996 2.43195 6.43996C1.51995 6.43996 0.751953 7.18396 0.751953 8.11996C0.751953 9.03196 1.49595 9.79996 2.43195 9.79996C3.19995 9.79996 3.87195 9.27196 4.03995 8.55196H5.21595C5.40795 9.75196 6.34395 10.664 7.54395 10.856V12.032C6.82395 12.224 6.29595 12.872 6.29595 13.64C6.29595 14.552 7.03995 15.32 7.97595 15.32C8.91195 15.32 9.65595 14.576 9.65595 13.64C9.65595 12.872 9.12795 12.2 8.40795 12.032V10.856C9.60795 10.688 10.544 9.75196 10.736 8.55196H11.912C12.104 9.27196 12.752 9.79996 13.52 9.79996C14.432 9.79996 15.2 9.05596 15.2 8.11996C15.2 7.18396 14.456 6.43996 13.52 6.43996ZM8.83995 13.616C8.83995 14.072 8.45595 14.456 7.99995 14.456C7.54395 14.456 7.15995 14.072 7.15995 13.616C7.15995 13.16 7.54395 12.776 7.99995 12.776C8.45595 12.776 8.83995 13.16 8.83995 13.616Z" fill="currentColor"/>
<path d="M3.9919 4.64002C3.7999 4.83202 3.7999 5.12002 3.9919 5.31202C4.1839 5.50402 4.4719 5.50402 4.6639 5.31202C6.4399 3.53602 9.3199 3.53602 11.0959 5.31202C11.1919 5.40802 11.3119 5.45602 11.4319 5.45602C11.5519 5.45602 11.6719 5.40802 11.7679 5.31202C11.9599 5.12002 11.9599 4.83202 11.7679 4.64002C9.6319 2.48002 6.1279 2.48002 3.9919 4.64002Z" fill="currentColor"/>
<path d="M2.7679 3.77596C5.5999 0.967961 10.1599 0.967961 12.9919 3.77596C13.0879 3.87196 13.2079 3.91996 13.3279 3.91996C13.4479 3.91996 13.5679 3.87196 13.6639 3.77596C13.8559 3.58396 13.8559 3.29596 13.6639 3.10396C10.4719 -0.088039 5.2879 -0.088039 2.0959 3.10396C1.9039 3.29596 1.9039 3.58396 2.0959 3.77596C2.2879 3.96796 2.5759 3.96796 2.7679 3.77596Z" fill="currentColor"/>
</svg>
;

const routes = [

  {
    path: '/app/dashboard',
    icon: <HomeIcon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/Control-room', // url
    icon: iotIcon, // icon component
    name: 'Control room', // name that appear in Sidebar
  },
  {
    path: '/app/Manage-Device', // url
    icon: <AdjustmentsHorizontalIcon className={iconClasses}/>, // icon component
    name: 'Manage Device', // name that appear in Sidebar
  },
]

export default routes


