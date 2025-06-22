import { useEffect, useState } from 'react';

function WaitlistButton({ username, currentUserInWaitlist }) {
  const [isInWaitlist, setIsInWaitlist] = useState(false);

  useEffect(() => {
    const inWaitlist = currentUserInWaitlist(username);
    setIsInWaitlist(inWaitlist);

  }, [username]);




  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <button
        className={`btn ${isInWaitlist ? 'btn-accent' : 'btn-warning'}`}
        onClick={() => alert("btn clicked")}
      >
        {isInWaitlist ? 'Join waitlist' : 'Leave waitlist '}
      </button>

      <form className="flex-grow text-right">
        <input 
          type="text" 
          name="question"
          placeholder="Question"
          className="input input-bordered w-full max-w-xs"
        />
      </form>
    </div>
  );
}

export default WaitlistButton;
