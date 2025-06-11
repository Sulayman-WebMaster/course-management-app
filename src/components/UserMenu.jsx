import React, { useContext } from 'react';  // <- fix here
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Button from './Button';
import { AuthContext } from '../Provider/AuthProvider';

const UserMenu = () => {
    const { user, handleLogout } = useContext(AuthContext);

    return (
        <>
            {user ? (
                <div className='hidden md:block'>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer w-12 h-12">
                                <AvatarImage
                                    src={user?.photoURL || "https://i.postimg.cc/WpB7mWdy/60111.jpg"}
                                    alt={user?.displayName || "User"}
                                />
                                <AvatarFallback>{user?.displayName ? user.displayName[0] : "N"}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 mt-2">
                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="px-4 py-2 text-sm">
                                <p className="font-medium">{user?.displayName || "Your Name"}</p>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-[#FE7743] cursor-pointer"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="relative z-10">
                    <div className="relative hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Register</Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserMenu;
