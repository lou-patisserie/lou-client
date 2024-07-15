import { Metadata } from "next";
import { getCakeByName } from "@/api/cakes-api";
import { deSlugify, normalizeText } from "@/lib/formatters";
import JSONLD from "@/components/JSONLD";
import { Cake, CakeDetails, Variants } from "@/types/data-types";

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
            url: `https://www.loupatisserie.com/products/${normalizeText(params.productName)}`,
        },
        twitter: {
            card: "summary_large_image",
            title: cakeData.name,
            description: cakeDetails.description,
            images: cakeData.main_image,
        },
    };
}

const generateJsonLd = (cake: Cake, details: CakeDetails, variants: Variants | any) => {

    const normalizeCakeName = normalizeText(cake.name);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: cake.name,
        image: [cake.main_image, cake.sub_image1, cake.sub_image2].filter(Boolean),
        description: details.desc,
        sku: cake.ID,
        offers: {
            "@type": "AggregateOffer",
            priceCurrency: "IDR",
            lowPrice: Math.min(...variants.map((variant: Variants) => variant.price)),
            highPrice: Math.max(...variants.map((variant: Variants) => variant.price)),
            url: `https://www.loupatisserie.com/products/${normalizeCakeName}`,
            availability: "http://schema.org/InStock",
        },
    };

    return jsonLd;
};

export default async function ProductLayout({ children, params }: { children: React.ReactNode, params: { productName: string } }) {
    const cakeNameParam = decodeURIComponent(params.productName);
    const normalizeCakeName = deSlugify(cakeNameParam);

    const response = await getCakeByName(normalizeCakeName);
    const cake = response.data.cake;
    const details = response.data.aboutCake;
    const variants = response.data.variants;

    const jsonLdData = generateJsonLd(cake, details, variants);

    console.log(jsonLdData, "isi jsonLd");

    return (
        <div>
            <JSONLD data={jsonLdData} />
            {children}
        </div>
    );
}
