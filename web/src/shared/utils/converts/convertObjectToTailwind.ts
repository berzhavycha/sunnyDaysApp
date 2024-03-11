interface TailwindStyles {
    [key: string]: string | undefined;
}


export const convertObjectToTailwind = (styles: TailwindStyles): string => {
    let classes = '';
    for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
            classes += `${styles[key]} `;
        }
    }
    return classes.trim();
}