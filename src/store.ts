import { create } from "zustand";
import { CryptoPrice, Cryptocurrency, Pair } from "./types";
import { devtools } from "zustand/middleware";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
    result: CryptoPrice
    loading: boolean
}

export const useCryptoStore = create<CryptoStore>()(devtools((set)=> ({
    cryptocurrencies : [],
    result: {} as CryptoPrice,
    fetchCryptos: async () => {
       const cryptocurrencies = await getCryptos()
       set(()=> ({
        cryptocurrencies
       }))
    },
    fetchData: async (pair) => {
        set(()=>({
            loading: true
        }))
       const result = await fetchCurrentCryptoPrice(pair)
       set(()=>({result,
        loading: false
       }))
    },
    loading: false
})))


