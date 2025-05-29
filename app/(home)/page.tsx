import { Header } from '../_components/header'
import { getHomeData } from './_actions/get-home-data'
import { HomePageContent } from './_components/home-page-content'

export default async function Home() {
  const data = await getHomeData()

  return (
    <>
      <Header />
      <HomePageContent data={data} />
    </>
  )
}
