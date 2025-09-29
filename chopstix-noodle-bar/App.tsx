import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import CategoryTabs from './components/CategoryTabs';
import MenuItem from './components/MenuItem';
import OrderSummary from './components/OrderSummary';
import CartScreen from './components/CartScreen';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import PlaceholderScreen from './components/PlaceholderScreen';
import SignUpScreen from './components/SignUpScreen';
import CheckoutScreen from './components/CheckoutScreen';
import { MenuListItem, Category, OrderItem, Screen, Dish } from './types';

const menuData: MenuListItem[] = [
    // Appetisers
    { type: 'dish', id: 1, name: 'Crispy King Prawn (8) only 脆皮大虾', description: 'Coating with light flavour (dry), goes well as sandwiches or with your favourite dipping sauce', price: 7.80, category: 'Appetisers', isVegetarian: false },
    { type: 'dish', id: 2, name: 'Crispy Shredded Beef with Salt and peppers, fresh chilli', description: '', price: 7.20, category: 'Appetisers', isVegetarian: false },
    { type: 'dish', id: 3, name: 'Chopstix Mixed Hors D\'oeuvres (for 2 person)二人拼盘', description: '(Barbecue Ribs 2, Chicken Satay on Skewers 2, satay sauce, Sesame Prawn on Toast 4, Crispy Seaweed & Vegetarian Sring Rolls 4)', price: 12.90, category: 'Appetisers', isVegetarian: false },
    { type: 'dish', id: 4, name: 'Crispy Aromatic Duck Quarter', description: '(Served with Hoi Sin Sauce, Pancakes, Cucumber & Spring Onions)', price: 10.70, category: 'Appetisers', isVegetarian: false },
    { type: 'dish', id: 5, name: 'Crispy Aromatic Duck Half', description: '(Served with Hoi Sin Sauce, Pancakes, Cucumber & Spring Onions)', price: 19.90, category: 'Appetisers', isVegetarian: false },
    { type: 'dish', id: 6, name: 'Mongolian Lamb with Pancakes', description: '(Served with Hoi Sin Sauce, 6pcs pancake,Cucumber & Spring Onions)', price: 10.90, category: 'Appetisers', isVegetarian: false },
    { type: 'dish', id: 7, name: 'Crispy Seaweed', description: '', price: 5.00, category: 'Appetisers', isVegetarian: true },
    { type: 'dish', id: 8, name: 'Vegetarian Mini Spring Rolls (8)', description: '', price: 3.80, category: 'Appetisers', isVegetarian: true },
    
    // Chicken Wings
    { type: 'dish', id: 13, name: 'Chicken Wings with Honey Sauce', description: '', price: 6.90, category: 'Chicken wing 鸡翅', isVegetarian: false },
    { type: 'dish', id: 14, name: 'Chicken Wing Original Taste', description: '', price: 6.60, category: 'Chicken wing 鸡翅', isVegetarian: false },
    { type: 'dish', id: 15, name: 'Chicken Wing Capital Sauce', description: '', price: 6.90, category: 'Chicken wing 鸡翅', isVegetarian: false },
    { type: 'dish', id: 16, name: 'Chicken Wing Salt & Peppers', description: '', price: 6.90, category: 'Chicken wing 鸡翅', isVegetarian: false },

    // Special New Dishes
    { type: 'dish', id: 17, name: 'Tofu with Cashewnut', description: '', price: 6.80, category: 'Chopstix\'s Special New Dishes 新推荐', isVegetarian: true },
    { type: 'dish', id: 18, name: 'Satay Tofu Beancurd with veg on skewer (4) 豆腐串', description: 'Tofu, peppers and other seasonal veg (contain nuts) little spicy', price: 7.50, category: 'Chopstix\'s Special New Dishes 新推荐', isVegetarian: true },
    { type: 'dish', id: 19, name: 'Crispy King Prawn (8) only 脆皮大虾', description: 'Coating with light flavour (dry), goes well as sandwiches or with your favourite dipping sauce', price: 7.80, category: 'Chopstix\'s Special New Dishes 新推荐', isVegetarian: false },
    { type: 'dish', id: 20, name: 'Chicken Wings with Honey Sauce', description: '', price: 6.90, category: 'Chopstix\'s Special New Dishes 新推荐', isVegetarian: false },
    
    // Chef Specials
    { type: 'dish', id: 21, name: 'Law Han Mong Vegetable', description: '', price: 7.80, category: 'Chef Specials', isVegetarian: true },
    { type: 'dish', id: 22, name: 'Bang Bang Chicken', description: '', price: 8.20, category: 'Chef Specials', isVegetarian: false },
    { type: 'dish', id: 23, name: 'Salmon in Salt & Pepper with Fresh Chilli', description: '', price: 9.50, category: 'Chef Specials', isVegetarian: false },

    // Chopstix's Set (with heading)
    { type: 'heading', id: 'curry-heading', title: 'Chopstix Curry include steam rice', subtitle: '[served with boiled rice, for chips or egg fried rice 60p on top]', category: 'Chopstix\'s set'},
    { type: 'dish', id: 24, name: 'Chicken Curry', description: 'with onions and peas', price: 8.00, category: 'Chopstix\'s set', isVegetarian: false },
    { type: 'dish', id: 25, name: 'Beef Curry', description: 'with onions and peas', price: 8.20, category: 'Chopstix\'s set', isVegetarian: false },
    { type: 'dish', id: 26, name: 'King Prawn Curry', description: 'with onions and peas', price: 9.00, category: 'Chopstix\'s set', isVegetarian: false },

    // Sweet & Sour Dishes
    { type: 'dish', id: 9, name: 'Sweet and Sour Chicken', description: 'Battered chicken pieces in a tangy sweet and sour sauce with pineapple and peppers.', price: 8.50, category: 'Sweet & Sour Dishes', isVegetarian: false },
    { type: 'dish', id: 10, name: 'Sweet and Sour King Prawn', description: 'Juicy king prawns in a tangy sweet and sour sauce.', price: 9.50, category: 'Sweet & Sour Dishes', isVegetarian: false },
    
    // Dim Sum
    { type: 'dish', id: 11, name: 'Siu Mai (Pork Dumplings)', description: 'Classic steamed pork and prawn dumplings.', price: 5.50, category: 'Dim Sum', isVegetarian: false },
    { type: 'dish', id: 12, name: 'Har Gow (Prawn Dumplings)', description: 'Steamed dumplings with a translucent skin, filled with juicy prawns.', price: 5.80, category: 'Dim Sum', isVegetarian: false },
];

const categories: Category[] = [
    "Appetisers",
    "Chicken wing 鸡翅",
    "Chopstix's Special New Dishes 新推荐",
    "Chef Specials",
    "Chopstix's set",
    "Dim Sum",
    "Sweet & Sour Dishes"
];

const App: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen | string>('home');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category>('Appetisers');
    const [searchQuery, setSearchQuery] = useState('');

    const handleNavigate = (screen: Screen | string) => {
        setCurrentScreen(screen);
        window.scrollTo(0, 0);
    };

    const handleAddToOrder = (dish: Dish) => {
        setOrder(prevOrder => {
            const existingItem = prevOrder.find(item => item.dish.id === dish.id);
            if (existingItem) {
                return prevOrder.map(item =>
                    item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevOrder, { dish, quantity: 1, remarks: '' }];
        });
    };
    
    const handleUpdateOrderItemRemarks = (dishId: number, remarks: string) => {
        setOrder(prevOrder => 
            prevOrder.map(item => 
                item.dish.id === dishId ? { ...item, remarks } : item
            )
        );
    };
    
    const handlePlaceOrder = () => {
        alert('Thank you for your order! It has been placed successfully.');
        setOrder([]);
        handleNavigate('home');
    };

    const filteredMenu = useMemo(() => {
        // Global search if query exists
        if (searchQuery) {
            return menuData.filter(item => {
                if (item.type === 'heading') {
                    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
                }
                return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.description.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }
        // Otherwise, filter by category
        return menuData.filter(item => item.category === activeCategory);
    }, [activeCategory, searchQuery]);
    
    const getOrderQuantity = (dishId: number) => {
        const item = order.find(item => item.dish.id === dishId);
        return item ? item.quantity : 0;
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case 'home':
                return <HomeScreen onNavigate={handleNavigate} />;
            case 'menu':
                return (
                    <div className="container mx-auto px-4 pb-32">
                        <CategoryTabs 
                            categories={categories} 
                            activeCategory={searchQuery ? undefined : activeCategory}
                            onSelectCategory={(category) => {
                                setSearchQuery('');
                                setActiveCategory(category);
                            }}
                        />
                        <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            {filteredMenu.length > 0 ? filteredMenu.map(item => (
                                <MenuItem 
                                    key={item.id} 
                                    item={item} 
                                    onAddToOrder={handleAddToOrder} 
                                />
                            )) : (
                                <p className="p-8 text-center text-gray-500">No dishes found.</p>
                            )}
                        </div>
                    </div>
                );
            case 'cart':
                return <CartScreen 
                    order={order} 
                    setOrder={setOrder} 
                    onNavigate={handleNavigate} 
                    menuData={menuData}
                    onAddToOrder={handleAddToOrder}
                    onUpdateRemarks={handleUpdateOrderItemRemarks}
                />;
            case 'checkout':
                return <CheckoutScreen
                    order={order}
                    onPlaceOrder={handlePlaceOrder}
                    onBack={() => handleNavigate('cart')}
                />;
            case 'login':
                return <LoginScreen 
                    onLoginSuccess={() => {
                        setIsLoggedIn(true);
                        handleNavigate('home');
                    }}
                    onForgotPassword={() => handleNavigate('forgot-password')}
                    onNavigateToSignUp={() => handleNavigate('signup')}
                />;
            case 'forgot-password':
                return <ForgotPasswordScreen onBackToLogin={() => handleNavigate('login')} />;
            case 'signup':
                return <SignUpScreen 
                    onSignUpSuccess={() => {
                        setIsLoggedIn(true);
                        alert('Sign up successful!');
                        handleNavigate('home');
                    }}
                    onBackToLogin={() => handleNavigate('login')}
                />;
            default:
                return <PlaceholderScreen onBack={() => handleNavigate('home')} screenName={currentScreen as string} />;
        }
    };
    
    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
            <SideMenu 
                isOpen={isSideMenuOpen} 
                onClose={() => setIsSideMenuOpen(false)} 
                onNavigate={handleNavigate}
            />

            <Header 
                onMenuClick={() => setIsSideMenuOpen(true)}
                onNavigate={handleNavigate}
                isLoggedIn={isLoggedIn}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSearchVisible={currentScreen === 'menu'}
            />
            
            <main className="flex-grow pt-4">
                 <div className="flex flex-col flex-grow">
                    {renderScreen()}
                </div>
            </main>

            {order.length > 0 && currentScreen === 'menu' && (
                <OrderSummary order={order} onViewOrderClick={() => handleNavigate('cart')} />
            )}
            
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;