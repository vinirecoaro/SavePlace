import React, { createContext, ReactElement, useReducer } from "react";

export enum UserActionType {
    LOGAR,
    DESLOGAR,
    REGISTRAR
}

interface User {
    email: string;
    password: string;
    token: string;
    status: boolean;
    message: string;
}

interface UserReducerAction {
    type: UserActionType;
    user?: Partial<User>; // Permitir que `user` seja opcional e parcial
}

export const UserContext = createContext<User | null>(null);

export const UserDispatchContext = createContext<React.Dispatch<UserReducerAction> | null>(null);

const initialUser: User = {
    email: "",
    password: "",
    token: "",
    status: false,
    message: "",
};

export default function UserProvider({ children }: { children: ReactElement }) {
    // Remova os tipos genéricos do useReducer e confie na tipagem do estado inicial e da função redutora
    const [user, dispatch] = useReducer(UserReducer, initialUser);

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

function UserReducer(state: User, action: UserReducerAction): User {
    const { type, user: userAuth } = action;

    switch (type) {
        case UserActionType.LOGAR: {
            if (!userAuth) {
                throw new Error("Missing user data for LOGAR action");
            }
            return {
                ...state,
                ...userAuth,
                status: true,
                message: "Usuario autenticado com sucesso",
            };
        }
        case UserActionType.REGISTRAR: {
            if (!userAuth) {
                throw new Error("Missing user data for REGISTRAR action");
            }
            return {
                ...state,
                ...userAuth,
                status: true,
                message: "Usuario criado com sucesso",
            };
        }
        case UserActionType.DESLOGAR: {
            return {
                ...state,
                email: "",
                password: "",
                token: "",
                status: false,
                message: "Deslogado com sucesso",
            };
        }
        default: {
            throw new Error("Operação desconhecida");
        }
    }
}
