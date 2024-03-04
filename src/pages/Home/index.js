import SearchForm from "../../Components/SearchForm";
import SkillList from "../../Components/SkillList";
import CompanyList from "../Company";
function Home() {
  return (
    <>
      <SearchForm />
      <SkillList />
      <CompanyList />
    </>
  );
}

export default Home;
