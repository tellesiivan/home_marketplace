import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import SkeletonLoad from "../components/SkeletonLoad";
import ListingItem from "../components/ListingItem";

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      async function fetchListings() {
        try {
          // set reference
          const listingRef = collection(db, "listings");

          // create query
          const q = query(
            listingRef,
            where("offer", "==", true),
            orderBy("timestamp", "desc"),
            limit(10)
          );

          // execute query
          const querySnap = await getDocs(q);

          let listings = [];

          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });

          // set listings state to listings array

          setListings(listings);
          setLoading(false);
        } catch (error) {
          toast.error("unable to fetch listings");
        }
      }
      fetchListings();
    }
    // cancel subscription to useEffect
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <SkeletonLoad />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No current offers</p>
      )}
    </div>
  );
}
