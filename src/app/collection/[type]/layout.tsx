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

export async function generateMetadata(): Promise<Metadata> {
    const { data: productTypes } = await getAllProductTypes();

    if (!productTypes || productTypes.length === 0) {
        notFound();
    }

    const firstProductType = productTypes[0];

    return {
        title: `${firstProductType.name} | Lou Patisserie & Gelato`,
        description: firstProductType.desc,
        openGraph: {
            title: firstProductType.name,
            description: firstProductType.desc,
            url: `https://www.loupatisserie.com/collection/${normalizeText(firstProductType.name)}`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: firstProductType.name,
            description: firstProductType.desc,
        },
    };
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
        hasPart: productTypes.map((type) => ({
            "@type": "Product",
            name: type.name,
            url: `https://www.loupatisserie.com/collection/${normalizeText(type.name)}`,
        })),
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
