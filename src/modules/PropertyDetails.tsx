import HeadContent from "@/components/HeaderContent";
import { IconRating } from "@/components/icons";
import Spinner from "@/components/loadings/Spinner";
import EffectCard from "@/components/swiper/EffectCard";
import { getProperty } from "@/store/property.service";
import { PropertyFacility, PropertyItemData } from "@/types/property.types";
import capitalizeStr from "@/utils/toCapitalize";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function renderFacilityIcon(item: [string, any]): React.ReactNode {
  const [name, count] = item;
  const newName = capitalizeStr(name, "-").replace(/ /g, "");

  const Icon = dynamic(() => import(`../components/icons/Icon${newName}`));
  return (
    <>
      <span>
        <Icon></Icon>
      </span>
      <span className="text-sm font-medium">
        {count} {newName}
      </span>
    </>
  );
}

const PropertyDetails = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  const { data, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
    refetchOnWindowFocus: false,
    staleTime: 15 * 100 * 1000,
  });
  const facilities = Object.entries(data?.facility || {});

  return (
    <>
      <HeadContent title={data?.title} image={data?.image && data.image[0]} />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="p-5 bg-grayfc rounded-2xl">
          <Link
            href="/property"
            className="flex items-center gap-5 mb-6 text-xl font-medium"
          >
            <span>
              <svg
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.79292 0.792893C8.18345 1.18342 8.18345 1.81658 7.79292 2.20711L2.00003 8L7.79292 13.7929C8.18345 14.1834 8.18345 14.8166 7.79292 15.2071C7.4024 15.5976 6.76923 15.5976 6.37871 15.2071L0.585817 9.41422C-0.195233 8.63317 -0.195231 7.36683 0.585817 6.58579L6.37871 0.792893C6.76923 0.402369 7.4024 0.402369 7.79292 0.792893Z"
                  fill="#11142D"
                />
              </svg>
            </span>
            Details
          </Link>
          {isVisible && (
            <div className="fixed inset-0 z-40">
              <div
                onClick={toggleVisibility}
                className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer bg-opacity-60 overlay"
              >
                <EffectCard data={data?.image} />
              </div>
            </div>
          )}
          <div className="grid grid-cols-[2fr_1fr] gap-6">
            <div aria-label="left">
              <div aria-label="gallery" className="mb-4">
                <div className="grid grid-cols-[3fr_1fr] grid-rows-[162px_162px] gap-5">
                  {data && data.image && data.image[0] && (
                    <div className="relative row-[1/-1] col-[1/2]">
                      <Image
                        src={data.image[0]}
                        fill
                        alt=""
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  )}
                  {data &&
                    data.image &&
                    data.image
                      .slice(1, 3)
                      .map((item: string, index: number) => (
                        <div className="relative" key={index}>
                          <Image
                            src={item}
                            fill
                            alt=""
                            className="object-cover rounded-lg row-[1/2] h-full"
                          />
                          {index === 1 && (
                            <div
                              onClick={toggleVisibility}
                              className="absolute inset-0 flex items-center justify-center text-lg font-medium text-white bg-black bg-opacity-50 rounded-lg cursor-pointer overlay"
                            >
                              +10
                            </div>
                          )}
                        </div>
                      ))}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-[3fr_1fr] gap-6 mb-5">
                  <div className="flex flex-col gap-2">
                    <span className="block text-lg font-medium">
                      {data?.type}
                    </span>
                    <h1 className="text-xl font-medium">{data?.title}</h1>
                    <div className="flex items-center gap-1 text-sm text-gray80">
                      <span></span>
                      <span>{data?.state}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      {Array(Math.floor(data?.rating || 0))
                        .fill(0)
                        .map((item, index) => (
                          <span key={index} className="inline-block w-6 h-6">
                            <IconRating></IconRating>
                          </span>
                        ))}
                    </div>
                    <div className="text-base font-medium">Price</div>
                    <div>
                      <strong className="text-2xl font-bold text-primary">
                        ${data?.price}
                      </strong>
                      <span className="text-sm text-gray80"> For One Day</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-7">Facillity</h3>
                <div className="grid grid-cols-4 gap-5 mb-6">
                  {facilities.length > 0 &&
                    facilities.map((item: [string, any], index: number) => (
                      <div className="flex items-center gap-1" key={index}>
                        {renderFacilityIcon(item)}
                      </div>
                    ))}
                </div>
                <h3 className="text-lg font-medium mb-2.5">Description</h3>
                <div className="text-sm leading-normal text-gray80">
                  {data?.description}
                </div>
              </div>
            </div>

            <div aria-label="right" className="flex flex-col gap-5">
              <div
                aria-label="agent"
                className="flex flex-col items-center justify-center px-6 py-4 border rounded-lg border-graye4 bg-grayfc"
              >
                <Image
                  src="/avatar.jpg"
                  width={90}
                  height={90}
                  className="w-[90px] aspect-square rounded-full object-cover mb-4"
                  alt=""
                />

                <h3 className="mb-2 text-lg font-semibold">Hussain Ahmed</h3>
                <div className="text-sm text-gray80">North Carolina, USA</div>
                <div className="my-2 font-semibold">10 Propertis</div>
                <div className="grid grid-cols-2 gap-5 mt-6">
                  <button>Message</button>
                  <button>Call</button>
                </div>
              </div>
              <div aria-label="map">
                <img src="/map.png" alt="" />
              </div>
              <div>
                <button>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
