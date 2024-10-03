import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Details = () => {
    const { user } = useAuth()
    const { id } = useParams()
    const axiosCommon = useAxiosCommon()
    const { data: posts = {} } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/details/${id}`)
            return data
        }
    })
    console.log(posts)
    return (
        <div>
            <Helmet>
                <title>
                    Blog Details
                </title>
            </Helmet>
            <div>
                {
                    posts && (
                        <div className="max-w-2xl px-10 mt-10 py-16 mx-auto space-y-12">
                            <article className="space-y-8  dark:text-gray-900">
                                <div className="space-y-6">
                                    <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{posts?.title}</h1>
                                    <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-600">
                                        <div className="flex items-center md:space-x-2">
                                            <img src={posts?.users?.image} alt="" className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-300" />
                                            <p className="text-sm">{posts?.users?.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dark:text-gray-800">
                                    <p>{posts?.location}</p>
                                </div>
                            </article>
                            <div>

                                <div className="space-y-2">
                                    <h4 className="text-lg font-semibold">Description</h4>
                                    <ul className="ml-4 space-y-1 list-disc">

                                      <p>{posts?.description}</p>


                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Details;