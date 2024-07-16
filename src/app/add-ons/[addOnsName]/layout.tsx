import { Metadata } from "next";
import { getAllProductTypes } from "@/api/product-type-api";
import { getAddOnByName } from "@/api/add-ons-api";
import { deSlugify, normalizeText } from "@/lib/formatters";
import JSONLD from "@/components/JSONLD";
import { notFound } from "next/navigation";
import { AddOnDetail } from "@/types/data-types";

export async function generateMetadata({ params }: { params: { addOnsName: string } }): Promise<Metadata> {
    const addOnsNameParam = decodeURIComponent(params.addOnsName);
    const normalizeAddOnsName = deSlugify(addOnsNameParam);

    const response = await getAddOnByName(normalizeAddOnsName);
    const addOnsData = response.data;

    return {
        title: `${addOnsData.name} | Lou Patisserie & Gelato`,
        description: addOnsData.description,
        robots: "index, follow",
        openGraph: {
            title: addOnsData.name,
            description: addOnsData.description,
            images: [
                addOnsData.main_image,
                addOnsData.sub_image1,
                addOnsData.sub_image2,
            ].filter(Boolean),
            url: `https://www.loupatisserie.com/add-ons/${normalizeAddOnsName}`,
        },
        twitter: {
            card: "summary_large_image",
            title: addOnsData.name,
            description: addOnsData.description,
            images: addOnsData.main_image,
        },
    };
}

const generateJsonLd = (addOnDetail: AddOnDetail) => {

    const normalizeAddOnsName = normalizeText(addOnDetail.name);
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": addOnDetail.name,
        "image": [
            addOnDetail.main_image,
            addOnDetail.sub_image1,
            addOnDetail.sub_image2,
        ].filter(Boolean),
        "description": addOnDetail.desc,
        "sku": addOnDetail.ID,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "IDR",
            "price": addOnDetail.price,
            "url": `https://www.loupatisserie.com/add-ons/${normalizeAddOnsName}`,
            "availability": "http://schema.org/InStock",
        }
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
