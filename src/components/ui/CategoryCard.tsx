import React from 'react'

interface CategoryCardProps {
    title: string;
    color: string;
    count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, color, count }) => {
    return (
        <div
            className="shrink-0 px-6 py-8 rounded-2xl border border-transparent hover:border-current/10 cursor-pointer min-w-[140px] flex flex-col justify-between h-32"
            style={{
                backgroundColor: `${color}12`,
                // border: `0.5px solid ${color}`
            }}
        >
                         <h1 className="font-semibold text-center tracking-tight group-hover:text-violate transition-colors"
                    style={{ color: color }}>
                    {title}
                </h1>
                <p className="text-gray-500 text-sm  text-center ">

                    {count} Tasks
                </p>
        </div>
    )
}

export default CategoryCard