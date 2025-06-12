import React, { useContext } from 'react';
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

const UserMenu = ({ display }) => {
    const { user, handleLogout } = useContext(AuthContext);

    return (
        <>
            {user ? (
                <div className={display}>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer w-12 h-12">
                                <AvatarImage
                                    src={user?.photoURL || "https://i.postimg.cc/WpB7mWdy/60111.jpg"}
                                    alt={user?.displayName || "User"}
                                />
                                <AvatarFallback>{user?.displayName ? user.displayName[0] : "N"}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-64 mt-2 p-4 rounded-2xl shadow-lg border border-gray-200 bg-white">
                            <div className="mb-2">
                                <DropdownMenuLabel className="text-gray-700 text-base font-semibold">Account</DropdownMenuLabel>
                            </div>
                            <DropdownMenuSeparator />
                            <div className="py-3">
                                <p className="font-medium text-gray-800">{user?.displayName || "Your Name"}</p>
                                <p className="text-gray-500 text-sm">{user?.email}</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-[#FE7743] cursor-pointer mt-2 hover:bg-[#fe77431a] rounded-lg px-2 py-2"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

            ) : (
                <div className="relative z-10">
                    <div className="relative hidden md:flex flex-col  lg:flex-row  items-center space-x-4  ">
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
