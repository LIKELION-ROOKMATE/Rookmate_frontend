import React, { useState, useEffect } from "react";
import { images } from "../../../assets/images/images";
import TopBar from "../../TopBar";
import PortfolioEditTimeline from './components/portfolioEditTimeline';
import PortfolioEditProfile from './components/portfolioEditProfile';
import PortfolioEditContent from './components/portfolioEditContent';
import { relative } from 'path';

interface Styles{
  DisplayNone:React.CSSProperties;
  stackBox:React.CSSProperties;
  stackName:React.CSSProperties;
  proficiencyBox:React.CSSProperties;
  proficiency:React.CSSProperties;
  page:React.CSSProperties;
  portfolioDetail:React.CSSProperties;
  portfolioContent:React.CSSProperties;
  workList:React.CSSProperties;
  addSomething:React.CSSProperties;
  templateEditTools:React.CSSProperties;
  toolBoxGroup:React.CSSProperties;
  explain:React.CSSProperties;
  toolBox:React.CSSProperties;
  toolBoxButton:React.CSSProperties;
  completeButton:React.CSSProperties;
}

const styles:Styles = {
  DisplayNone: {
    display: "none",
  },
  stackBox:{
    display: "flex",
    flexDirection: "row",

    width: "100%",

    fontSize: "1rem",
  },
  stackName:{
    width: "20%",
    fontSize: "0.8rem",

    marginRight: "5%",
    
    overflowWrap: "break-word",
  },
  proficiencyBox:{
    position: "relative",

    width: "60%",
    height: "1.1rem",

    margin: "0 0 1rem 0",
    border: "2px solid #7FA3C5",
    borderRadius: "10px",

    fontSize: "1rem",
  },
  proficiency:{
  position: "relative",
  right: "0.1rem",

  backgroundColor: "#7FA3C5",
  height: "100%",

  borderRadius: "10px",
  },
  page:{
    width: "100%",
    height: "65rem",
    fontFamily: 'TheJamsil5Bold',
  },
  portfolioDetail:{
    display: "flex",
    flexDirection: "row",

    width: "94.9rem",
    height: "73.8%",
  },
  portfolioContent:{
    width: "77%",
    height: "100%",
    boxShadow: "-4px 0px 16px 8px rgba(0, 0, 0, 0.25)",

    padding: "4.5rem 2rem 0 4.5rem",
  },
  workList:{
    width: "100%",
    height: "66.7%",
  },
  addSomething:{
    width: "19rem",
    height: "19rem",
  },
  templateEditTools:{
    display: "flex",
    alignItems:"end",
    flexDirection: "column",
  },
  toolBoxGroup:{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "33.3%",
    fontWeight: "400",
  },
  explain:{
    display: "flex",
    alignItems: "end",

    position: "relative",
    left:"1rem",

    height: "2.5rem",

    marginBottom: "0.5rem",
    textAlign: "left",
    
    fontSize: "1rem",
    fontWeight: "400",
  },
  toolBox:{
    display: "flex",
    gap: "2rem",
    alignItems: "center",

    width: "96%",
    height: "3.5rem",
    
    border: "0.3rem solid #7FA3C5",
    boxShadow: "0.25rem 0.25rem 0.5rem 0.25rem rgba(0, 0, 0, 0.25)",
    borderRadius: "3.125rem",
  },
  toolBoxButton:{
    position: "relative",
    left: "2rem",

    border: "none",
    
    backgroundColor: "#fff",

    textDecoration: "none",
    fontSize: "1.5rem",
  },
  completeButton:{
    position: "relative",
    right: "2rem",

    width: "15rem",
    height: "4rem",

    border: "none",

    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    marginTop: "2.5rem",

    backgroundColor: "#C0D9FF",

    fontSize: "1.5rem",
    color: "#fff",
  },
};

const PortfolioEdit: React.FC = () => {
  //사용자 기본 정보 관련 state
  const [name, setName] = useState("홍길동");
  const [age, setAge] = useState("22");
  const [collage, setCollage] = useState("국민대학교");
  const [departure, setDeparture] = useState("소프트웨어학부");
  const [profileImage, setProfileImage]:any = useState(images.noneProfile);
  //기술 스택 관련 state
  const [stacks, setStack] = useState([]);
  //요소들의 표시 여부를 나타내는 state
  const [viewList, setViewList] = useState({
    stack: true,
    timeline: true,
    license: true,
    sns: true,
    competition: true,
  });
  // 서버에서 사용자 기술 스택 받아와서 반영하는 effect
  useEffect(() => {
    const initialStack: any = [];
    //get Data : dataList
    const skillStack: string[] = [
      "Spring",
      "django",
      "Java",
      "React",
      "Algorithm",
    ];
    const dataList: number[] = [40, 50, 60, 30, 80];
    for (let i = 0; i < dataList.length; i++) {
      initialStack.push(
        <div style={styles.stackBox}>
          <p style={styles.stackName}>{skillStack[i]}</p>
          <div style={styles.proficiencyBox}>
            <div style={{...styles.proficiency, width: `${dataList[i]}%` }}>
              &nbsp;
            </div>
          </div>
        </div>
      );
    }
    setStack(initialStack);
  }, []);
  // toolBox 버튼을 누르면 해당 요소 활성화/비활성화하는 이벤트
  const checkViewListEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const idName: keyof typeof viewList = e.currentTarget
      .id as keyof typeof viewList;
    console.log(idName);
    const value: boolean = viewList[idName] ? false : true;
    setViewList((prev: typeof viewList) => ({ ...prev, [idName]: value }));
    console.log(viewList.stack);
  };

  return (
    <div style={styles.page}>
      <TopBar />
      <PortfolioEditTimeline viewList={viewList} />
      <div style={styles.portfolioDetail}>
        <PortfolioEditProfile props={{
          profileImage:profileImage,
          name:name,
          age:age,
          collage:collage,
          departure:departure,
          viewList:viewList,
          stacks:stacks,
        }}/>
        <PortfolioEditContent props={{
          profileImage:profileImage,
          name:name,
          age:age,
          collage:collage,
          departure:departure,
          viewList:viewList,
          stacks:stacks,
        }} checkViewListEvent={checkViewListEvent}/>
      </div>
    </div>
  );
};

export default PortfolioEdit;
