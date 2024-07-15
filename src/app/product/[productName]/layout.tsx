import { Metadata } from "next";
import { getCakeByName } from "@/api/cakes-api";
import { getAllAddOns } from "@/api/add-ons-api";
import { deSlugify } from "@/lib/formatters";
import JSONLD from "@/components/JSONLD";

export async function generateMetadata({ params }: { params: { productName: string } }): Promise<Metadata> {
    const cakeNameParam = decodeURIComponent(params.productName);
    const normalizeCakeName = deSlugify(cakeNameParam);

    const response = await getCakeByName(normalizeCakeName);
    const cakeData = response.data.cake;
    const cakeDetails = response.data.aboutCake;

    return {
        title: `${cakeData.name} | Lou Patisserie & Gelato`,
        description: cakeDetails.description,
        openGraph: {
            title: cakeData.name,
            description: cakeDetails.description,
            images: [
                cakeData.main_image,
                cakeData.sub_image1,
                cakeData.sub_image2,
            ].filter(Boolean),
            url: `https://www.loupatisserie.com/products/${normalizeCakeName}`,
        },
        twitter: {
            card: "summary_large_image",
            title: cakeData.name,
            description: cakeDetails.description,
            images: cakeData.main_image,
        },
    };
}

export const generateJsonLd = (cake: any, details: any, variants: any[], addOns: any[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: cake.name,
        image: [cake.main_image, cake.sub_image1, cake.sub_image2].filter(Boolean),
        description: details.description,
        sku: cake.ID,
        offers: {
            "@type": "AggregateOffer",
            priceCurrency: "IDR",
            lowPrice: Math.min(...variants.map((variant: { price: any }) => variant.price)),
            highPrice: Math.max(...variants.map((variant: { price: any }) => variant.price)),
            url: `https://www.loupatisserie.com/products/${cake.name}`,
            availability: "http://schema.org/InStock",
        },
        additionalType: addOns.map((addOn: { name: any; image: any; description: any; price: any }) => ({
            "@type": "Product",
            name: addOn.name,
            image: addOn.image,
            description: addOn.description,
            price: addOn.price,
        })),
    };
};

export default async function ProductLayout({ children, params }: { children: React.ReactNode, params: { productName: string } }) {
    const cakeNameParam = decodeURIComponent(params.productName);
    const normalizeCakeName = deSlugify(cakeNameParam);

    const response = await getCakeByName(normalizeCakeName);
    const cakeData = response.data.cake;
    const cakeDetails = response.data.aboutCake;
    const cakeVariants = response.data.variants;

    let addOns: any[] = [];
    try {
        const addOnsResponse = await getAllAddOns();
        addOns = addOnsResponse.data;
    } catch (addOnsError) {
        console.error("Failed to fetch add-ons", addOnsError);
    }

    const jsonLdData = generateJsonLd(cakeData, cakeDetails, cakeVariants, addOns);

    return (
        <div>
            <JSONLD data={jsonLdData} />
            {children}
        </div>
    );
}
