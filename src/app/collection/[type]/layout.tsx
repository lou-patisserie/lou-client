import { Metadata } from "next";
import { getAllProductTypes } from "@/api/product-type-api";
import { normalizeText } from "@/lib/formatters";
import JSONLD from "@/components/JSONLD";
import { notFound } from "next/navigation";

type ProductTypes = {
    ID: string;
    name: string;
    desc: string;
    created_date: string;
};

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
    const typeNameParam = decodeURIComponent(params.type);

    try {
        const { data: productTypes } = await getAllProductTypes();
        const selectedProductType = productTypes.find((type: ProductTypes) => normalizeText(type.name) === typeNameParam);

        return {
            title: `${selectedProductType.name} | Lou Patisserie & Gelato`,
            description: selectedProductType.desc,
            robots: "index, follow",
            openGraph: {
                title: selectedProductType.name,
                description: selectedProductType.desc,
                url: `https://www.loupatisserie.com/collection/${normalizeText(selectedProductType.name)}`,
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: selectedProductType.name,
                description: selectedProductType.desc,
            },
        };
    } catch (error) {
        console.error("Failed to fetch product types", error);
        throw error;
    }
}

const generateJsonLd = (productTypes: ProductTypes[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Collection",
        url: "https://www.loupatisserie.com/collection/all-product",
        logo: "https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/interior%2FLou_Interior%2016.jpg?alt=media&token=e14edff7-d088-492e-af2a-23462c7dd573",
        image: productTypes.map((type) => ({
            "@type": "ImageObject",
            name: type.name,
            url: `https://firebasestorage.googleapis.com/v0/b/lou-patisserie.appspot.com/o/interior%2F${type.ID}.jpg?alt=media`, // Replace with actual URLs
        })),
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.loupatisserie.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
    };
};

export default async function CollectionLayout({ children }: { children: React.ReactNode }) {
    const { data: productTypes } = await getAllProductTypes();

    if (!productTypes || productTypes.length === 0) {
        notFound();
    }

    const jsonLdData = generateJsonLd(productTypes);

    return (
        <div>
            <JSONLD data={jsonLdData} />
            {children}
        </div>
    );
}
