// export const selectStyles = {
//     control: (base: any) => ({
//         ...base,
//         border: '1px solid transpa',
//         minWidth: '210px',
//         height: '28px',
//         boxShadow: 'none',
//         borderRadius: '8px',
//         backgroundColor: '#f0f1f7',
//         transition: 'all .3s',
//         '&:hover': {
//             border: '1px solid #8e90a7',
//         },
//         '&:focus': {
//             backgroundColor: 'transparent',
//         },
//     }),
//     placeholder: (base: any) => ({
//         ...base,
//         color: '#333',
//         fontSize: 14,
//         paddingLeft: 15,
//     }),
//     singleValue: (base: any) => ({
//         ...base,
//         color: '#15171a',
//         fontSize: 14,
//         paddingLeft: 15,
//         fontWeight: 600,
//     }),
//     indicatorSeparator: (base: any) => ({
//         display: 'none',
//     }),
//     option: (base: any, { isSelected }: any) => ({
//         ...base,
//         fontWeight: 500,
//         color: isSelected ? '#f44242' : '#15171a',
//         backgroundColor: isSelected ? 'transparent' : 'transparent',
//     }),
//     menu: (base: any) => ({
//         ...base,
//         // boxShadow: '0 4px 80px 0 rgba(53, 56, 64, 0.25)',
//         borderRadius: '0 16px 16px 16px',
//         border: 'none',
//         zIndex: 10,
//     }),
//     input: (base: any) => ({
//         ...base,
//         color: '#15171a',
//         // paddingLeft: 15,
//         fontSize: 14,
//         paddingLeft: 15,
//     }),
// }

import { StylesConfig } from 'react-select'

// export const selectStyles = {
//     control: (base: any) => ({
//         ...base,
//         border: '1px solid transpa',
//         minWidth: '210px',
//         height: '28px',
//         boxShadow: 'none',
//         borderRadius: '8px',
//         backgroundColor: '#f0f1f7',
//         transition: 'all .3s',
//         '&:hover': {
//             border: '1px solid #8e90a7',
//         },
//         '&:focus': {
//             backgroundColor: 'transparent',
//         },
//     }),
//     placeholder: (base: any) => ({
//         ...base,
//         color: '#333',
//         fontSize: 14,
//         paddingLeft: 15,
//     }),
//     singleValue: (base: any) => ({
//         ...base,
//         color: '#15171a',
//         fontSize: 14,
//         paddingLeft: 15,
//         fontWeight: 600,
//     }),
//     indicatorSeparator: (base: any) => ({
//         ...base,
//         display: 'none',
//     }),
//     option: (base: any, { isSelected }: any) => ({
//         ...base,
//         fontWeight: 500,
//         color: isSelected ? '#f44242' : '#15171a',
//         backgroundColor: isSelected ? 'transparent' : 'transparent',
//     }),
//     menu: (base: any) => ({
//         ...base,
//         // boxShadow: '0 4px 80px 0 rgba(53, 56, 64, 0.25)',
//         borderRadius: '0 16px 16px 16px',
//         border: 'none',
//         zIndex: 10,
//     }),
//     input: (base: any) => ({
//         ...base,
//         color: '#15171a',
//         // paddingLeft: 15,
//         fontSize: 14,
//         paddingLeft: 15,
//     }),
// }

export const newStyles = createSelectStyles({
    menu: (base: any) => ({
        ...base,
        // boxShadow: '0 4px 80px 0 rgba(53, 56, 64, 0.25)',
        borderRadius: '0 16px 16px 16px',
        border: 'none',
        zIndex: 10,
        width: '500px',
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: '200px', 
        overflowY: 'auto', 
    }),
    control: (base: any) => ({
        ...base,
        border: '1px solid #e3e8ee',
        width: '500px',
        height: '48px',
        overflowY: "auto",
        boxShadow: 'none',
        transition: 'all .3s',
        '&:hover': {
            border: '1px solid #8e90a7',
        },
        '&:focus': {
            backgroundColor: 'transparent',
        },
    }),
    placeholder: (base, props) => ({
        ...base,
        fontFamily: 'var(--font-family)',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '143%',
        letterSpacing: '0.01em',
        color: '#5e626b',
        padding: '8px 12px 8px 24px',
    }),
    option: (base: any, { isSelected }: any) => ({
        ...base,
        width: '500px',
        height: '48px',
        fontWeight: 500,
        color: isSelected ? '#f44242' : '#15171a',
        backgroundColor: isSelected ? 'transparent' : 'transparent',
    }),
})

export function createSelectStyles(options: StylesConfig = {}): StylesConfig {
    return {
        control: (base: any) => ({
            ...base,
            border: '1px solid transpa',
            minWidth: '210px',
            height: '28px',
            boxShadow: 'none',
            borderRadius: '8px',
            backgroundColor: '#f0f1f7',
            transition: 'all .3s',
            '&:hover': {
                border: '1px solid #8e90a7',
            },
            '&:focus': {
                backgroundColor: 'transparent',
            },
        }),
        placeholder: (base: any) => ({
            ...base,
            color: '#333',
            fontSize: 14,
            paddingLeft: 15,
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#15171a',
            fontSize: 14,
            paddingLeft: 15,
            fontWeight: 600,
        }),
        indicatorSeparator: (base: any) => ({
            ...base,
            display: 'none',
        }),
        option: (base: any, { isSelected }: any) => ({
            ...base,
            fontWeight: 500,
            color: isSelected ? '#f44242' : '#15171a',
            backgroundColor: isSelected ? 'transparent' : 'transparent',
        }),
        menu: (base: any) => ({
            ...base,
            // boxShadow: '0 4px 80px 0 rgba(53, 56, 64, 0.25)',
            borderRadius: '0 16px 16px 16px',
            border: 'none',
            zIndex: 10,
        }),
        input: (base: any) => ({
            ...base,
            color: '#15171a',
            // paddingLeft: 15,
            fontSize: 14,
            paddingLeft: 15,
        }),
        ...options,
    }
}
